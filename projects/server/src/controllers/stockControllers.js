const { Op } = require("sequelize");
const db = require("../models");
const Joi = require("joi");
const stockHistory = require("./stockHistoryControllers");

const stockController = {
	getStock: async (req, res) => {
		try {
			const { sort, search } = req.query;
			const limit = 12;

			const page = req?.query?.page || 1;
			let offset = (parseInt(page) - 1) * limit;

			const sortOptions = {
				qtyAsc: [["qty", "ASC"]],
				qtyDesc: [["qty", "DESC"]],
				productAsc: [[{ model: db.products }, "product_name", "ASC"]],
				productDesc: [[{ model: db.products }, "product_name", "DESC"]],
				warehouseAsc: [[{ model: db.warehouses }, "warehouse_name", "ASC"]],
				warehouseDesc: [[{ model: db.warehouses }, "warehouse_name", "DESC"]],
				categoryAsc: [[{ model: db.products }, "category_id", "ASC"]],
				categoryDesc: [[{ model: db.products }, "category_id", "DESC"]],
			};
			const sortOrder = sortOptions[sort] || null;

			const stock = await db.stocks.findAndCountAll({
				where: {
					[Op.and]: [
						{
							product_id: {
								[Op.like]: `${req.query.product_id}` || `%${""}%`,
							},
						},

						{
							warehouse_id: {
								[Op.like]: `%${req.query.warehouse_id || ""}%`,
							},
						},

						{
							"$product.product_name$": {
								[Op.like]: `%${search || ""}%`,
							},
						},
						// {
						// 	"$product.category.category_name$": {
						// 		[Op.like]: `%${req.query.selectedCategory || ""}%`,
						// 	},
						// },

						// {
						// 	"$warehouse.warehouse_name$": {
						// 		[Op.like]: `%${!null}%`,
						// 	},
						// },
					],
				},
				include: [
					{
						model: db.products,
						include: [{ model: db.product_images }, { model: db.categories }],
					},
					{ model: db.warehouses },
				],
				distinct: true,
				order: sortOrder,
			});
			res.status(200).send({
				count: stock.count,
				rows: stock.rows.slice(offset, limit * page),
			});
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	addStock: async (req, res) => {
		const { qty, product_id, warehouse_id } = req.body;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			qty: Joi.number().min(0).required(),
			product_id: Joi.number().required(),
			warehouse_id: Joi.number().required(),
		});

		const validation = schema.validate({ qty, product_id, warehouse_id });

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			const existingStock = await db.stocks.findOne({
				where: { product_id, warehouse_id },
			});

			if (existingStock) {
				return res.status(409).send({
					message: "Stock for the given product and warehouse already exists.",
				});
			}

			const newStock = await db.stocks.create(
				{
					qty,
					product_id,
					warehouse_id,
				},
				{ transaction: t }
			);

			await t.commit();
			await stockHistory.addStockHistory(newStock, "IN", "ADD FROM ADMIN", qty);
			res.status(200).send(newStock);
		} catch (err) {
			await t.rollback();
			res.status(500).send({
				message: err.message,
			});
		}
	},
	editStock: async (req, res) => {
		const { qty } = req.body;
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			qty: Joi.number().min(0).required(),
		});

		const validation = schema.validate({ qty });

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			const existingStock = await db.stocks.findOne({
				where: { id },
			});

			if (!existingStock) {
				return res.status(404).send({ message: "Stock not found" });
			}

			const oldQty = existingStock.qty;
			const status = qty < oldQty ? "OUT" : "IN";

			await stockHistory.addStockHistory(
				existingStock,
				status,
				"EDIT FROM ADMIN",
				qty
			);
			await db.stocks.update({ qty }, { where: { id }, transaction: t });
			await t.commit();

			res.send({ message: "Stock updated successfully" });
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
	deleteStock: async (req, res) => {
		const { id } = req.params;
		const t = await db.sequelize.transaction();
		try {
			const stock = await db.stocks.findOne({ where: { id } });

			if (!stock) {
				return res.status(404).send({ message: "Stock not found." });
			}

			await db.stocks.destroy({ where: { id: id }, transaction: t });
			await t.commit();
			res.status(200).send({ message: "Stock deleted successfully" });
		} catch (err) {
			await t.rollback();
			res.status(500).send({ message: err.message });
		}
	},
};

module.exports = stockController;
