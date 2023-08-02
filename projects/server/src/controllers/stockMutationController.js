const db = require("../models");
const { Op } = require("sequelize");
const Joi = require("joi");
const moment = require("moment");

const stockMutation = {
	getStockMutation: async () => {
		try {
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	requestStockMutation: async () => {
		try {
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
};

module.exports = stockMutation;
