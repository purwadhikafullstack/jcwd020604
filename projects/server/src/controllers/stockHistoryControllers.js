const db = require("../models");
const { Op } = require("sequelize");

const stockHistory = {
	getHistory: async (req, res) => {
		try {
			const { sort, search } = req.query;
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
				warehouseAsc: [
					[
						{ model: db.stocks },
						{ model: db.warehouses },
						"warehouse_name",
						"ASC",
					],
				],
				warehouseDesc: [
					[
						{ model: db.stocks },
						{ model: db.warehouses },
						"warehouse_name",
						"DESC",
					],
				],
				stockAfterAsc: [["stock_after", "ASC"]],
				stockAfterDesc: [["stock_after", "DESC"]],
				statusAsc: [["status", "ASC"]],
				statusDesc: [["status", "DESC"]],
				referenceAsc: [["reference", "ASC"]],
				referenceDesc: [["reference", "DESC"]],
				dateAsc: [["createdAt", "ASC"]],
				dateDesc: [["createdAt", "DESC"]],
			};
			const sortOrder = sortOptions[sort] || null;

			const history = await db.stock_histories.findAndCountAll({
				include: [
					{
						model: db.stocks,
						include: [
							{ model: db.products, include: [{ model: db.product_images }] },
							{ model: db.warehouses },
						],
					},
				],
				distinct: true,
				order: sortOrder,
			});

			res.status(200).send({
				count: history.count,
				rows: history.rows.slice(offset, limit * page),
			});
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	addStockHistory: async (dataStock, status, reference, qty) => {
		try {
			const newHistory = await db.stock_histories.create({
				qty: qty - dataStock.qty,
				status,
				reference,
				stock_id: dataStock.id,
				stock_before: dataStock.qty,
				stock_after: qty,
			});
			return newHistory;
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
};

module.exports = stockHistory;
