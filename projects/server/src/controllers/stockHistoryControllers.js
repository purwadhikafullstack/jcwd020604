const db = require("../models");
const { Op } = require("sequelize");

const stockHistory = {
	getHistory: async (req, res) => {
		try {
			const { sort, search } = req.query;
			const limit = 12;

			const page = req?.query?.page || 1;
			let offset = (parseInt(page) - 1) * limit;

			const history = await db.stock_histories.findAll({
				include: [
					{
						model: db.stocks,
						include: [
							{ model: db.products, include: [{ model: db.product_images }] },
							{ model: db.warehouses },
						],
					},
				],
			});
			// distinct: true,

			res.status(200).send(history);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	addStockHistory: async (dataStock, status, reference) => {
		try {
			const newHistory = await db.stock_histories.create({
				qty: dataStock.qty,
				status,
				reference,
				stock_id: dataStock.id,
			});
			return newHistory;
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
};

module.exports = stockHistory;
