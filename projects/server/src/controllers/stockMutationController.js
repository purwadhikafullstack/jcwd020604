const db = require("../models");
const { Op } = require("sequelize");
const Joi = require("joi");
const moment = require("moment");

const stockMutation = {
	getStockMutation: async (req, res) => {
		try {
			const mutation = await db.stock_mutations.findAll();

			return res.status(200).send(mutation);
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	requestStockMutation: async (req, res) => {
		try {
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
};

module.exports = stockMutation;
