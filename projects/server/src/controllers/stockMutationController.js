const db = require("../models");
const { Op } = require("sequelize");
const Joi = require("joi");
const moment = require("moment");
const stockHistory = require("./stockHistoryControllers");

const stockMutation = {
	getMutation: async (req, res) => {
		try {
			const { sort, search, time, status, from_warehouse_id, to_warehouse_id } =
				req.query;
			const limit = 12;

			const page = req?.query?.page || 1;
			let offset = (parseInt(page) - 1) * limit;

			const sortOptions = {
				productAsc: [
					[{ model: db.stocks }, { model: db.products }, "product_name", "ASC"],
				],
				productDesc: [
					[
						{ model: db.stocks },
						{ model: db.products },
						"product_name",
						"DESC",
					],
				],
				from_WarehouseAsc: [["from_Warehouse_id", "ASC"]],
				from_WarehouseDesc: [["from_Warehouse_id", "DESC"]],
				mutation_codeAsc: [["mutation_code", "ASC"]],
				mutation_codeDesc: [["mutation_code", "DESC"]],
				qtyAsc: [["qty", "ASC"]],
				qtyDesc: [["qty", "DESC"]],
				statusAsc: [["status", "ASC"]],
				statusDesc: [["status", "DESC"]],
				dateAsc: [["createdAt", "ASC"]],
				dateDesc: [["createdAt", "DESC"]],
			};
			const sortOrder = sortOptions[sort] || sortOptions.dateDesc;

			let whereClause = {};

			if (search) {
				whereClause["$stock.product.product_name$"] = {
					[Op.like]: `%${search || ""}%`,
				};
			}

			if (status) {
				whereClause["$status$"] = {
					[Op.like]: `%${status}%`,
				};
			}

			if (time) {
				// Apply time filter if 'time' is selected
				whereClause[Op.and] = [
					{
						createdAt: { [Op.gte]: moment(time).format() },
					},
					{
						createdAt: {
							[Op.lte]: moment(time).endOf("month").format(),
						},
					},
				];
			}

			if (from_warehouse_id) {
				whereClause["$from_warehouse_id$"] = {
					[Op.like]: `%${from_warehouse_id}%`,
				};
			}

			if (to_warehouse_id) {
				whereClause["$to_warehouse_id$"] = {
					[Op.like]: `%${to_warehouse_id}%`,
				};
			}

			const mutation = await db.stock_mutations.findAndCountAll({
				where: {
					...whereClause,
				},

				include: [
					{
						model: db.stocks,
						include: [
							{ model: db.products, include: [{ model: db.product_images }] },
						],
					},
					{
						model: db.warehouses,
						as: "from_warehouse",
					},
					{
						model: db.warehouses,
						as: "to_warehouse",
					},
				],
				distinct: true,
				order: sortOrder,
			});

			return res.status(200).send({
				count: mutation.count,
				rows: mutation.rows.slice(offset, limit * page),
			});
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	getMutationRequest: async (req, res) => {
		try {
			const { from_warehouse_id } = req.query;

			let whereClause = {};

			if (from_warehouse_id) {
				whereClause["$from_warehouse_id$"] = {
					[Op.like]: `%${from_warehouse_id}%`,
				};
			}

			const request = await db.stock_mutations.findAll({
				where: { status: "PENDING", ...whereClause },
				include: [
					{
						model: db.stocks,
						include: [
							{ model: db.products, include: [{ model: db.product_images }] },
						],
					},
					{
						model: db.warehouses,
						as: "from_warehouse",
					},
					{
						model: db.warehouses,
						as: "to_warehouse",
					},
				],
			});
			res.status(200).send(request);
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	requestMutation: async (req, res) => {
		const { qty, stock_id, from_warehouse_id, to_warehouse_id } = req.body;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			qty: Joi.number().min(0).required(),
			stock_id: Joi.number().required(),
			from_warehouse_id: Joi.number().required(),
			to_warehouse_id: Joi.number().required(),
		});

		const validation = schema.validate({
			qty,
			stock_id,
			from_warehouse_id,
			to_warehouse_id,
		});

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		// Check if 'from_warehouse_id' is equal to 'to_warehouse_id'
		if (from_warehouse_id === to_warehouse_id) {
			return res.status(400).send({
				message: "Source and destination warehouses cannot be the same.",
			});
		}

		try {
			// Check if there is enough stock from selected warehouse
			const existingStock = await db.stocks.findOne({
				where: {
					id: stock_id,
					warehouse_id: from_warehouse_id,
				},
			});

			if (!existingStock || existingStock.qty < qty) {
				return res
					.status(404)
					.send({ message: "Insufficient stock from selected warehouse." });
			}

			// Check if stock mutation is pending
			const pendingMutation = await db.stock_mutations.findOne({
				where: {
					stock_id,
					from_warehouse_id,
					to_warehouse_id,
					status: "PENDING",
				},
			});

			if (pendingMutation) {
				return res
					.status(409)
					.send({ message: "Stock mutation has pending confirmation" });
			}

			await db.stock_mutations.create(
				{
					qty,
					stock_id,
					to_warehouse_id,
					from_warehouse_id,
					status: "PENDING",
				},
				{ transaction: t }
			);
			await t.commit();
			res.status(200).send({
				message: "Stock mutation request submitted for confirmation.",
			});
		} catch (err) {
			await t.rollback();
			res.status(500).send({ message: err.message });
		}
	},
	confirmMutation: async (req, res) => {
		const { id, status } = req.body;
		try {
			// const pendingMutation = await db.stock_mutations.findOne({
			// 	where: {
			// 		id: id,
			// 		status: "PENDING",
			// 	},
			// });
			// if (!pendingMutation) {
			// 	return res.status(404).send({
			// 		message: "Pending mutation not found or already processed.",
			// 	});
			// }
		} catch (err) {
			await t.rollback();
			res.status(500).send({ message: err.message });
		}
	},
	editMutation: async (req, res) => {
		const { qty, stock_id, from_warehouse_id, to_warehouse_id } = req.body;
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			qty: Joi.number().min(0).required(),
			// stock_id: Joi.number().required(),
			// from_warehouse_id: Joi.number().required(),
			// to_warehouse_id: Joi.number().required(),
		});

		const validation = schema.validate({
			qty,
			// stock_id,
			// from_warehouse_id,
			// to_warehouse_id,
		});

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			await db.stock_mutations.update(
				{
					qty,
					// stock_id,
					// from_warehouse_id,
					// to_warehouse_id,
				},
				{
					where: { id: id },
					transaction: t,
				}
			);
			await t.commit();
			res.status(200).send({ message: "Mutation updated successfully." });
		} catch (err) {
			await t.rollback();
			res.status(500).send({ message: err.message });
		}
	},
	cancelMutation: async (req, res) => {
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		try {
			const existingMutation = await db.stock_mutations.findOne({
				where: { id, status: "PENDING" },
			});

			if (!existingMutation) {
				return res.status(404).send({ message: "Stock mutation not found." });
			}

			await db.stock_mutations.destroy({
				where: { id: id },
				transaction: t,
			});

			await t.commit();
			res.status(200).send({ message: "Stock mutation canceled" });
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
};

module.exports = stockMutation;
