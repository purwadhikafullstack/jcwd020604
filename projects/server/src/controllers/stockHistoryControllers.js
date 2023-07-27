const db = require("../models");
const { Op } = require("sequelize");

const stockHistory = {
	getHistory: async (req, res) => {
		try {
			const history = await db.stock_histories.findAll();

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
