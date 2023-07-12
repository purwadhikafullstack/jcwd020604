const db = require("../models");

const categoryControllers = {
	insertCat: async (req, res) => {
		try {
			const { category_name } = req.body;
			await db.categories
				.create({
					category_name,
				})
				.then((result) => res.send(result));
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getCategory: async (req, res) => {
		try {
			await db.categories
				.findAll()
				.then((result) => res.status(200).send(result));
		} catch (err) {
			console.log(err);
			res.status(500).send({
				message: err.message,
			});
		}
	},
};
module.exports = categoryControllers;
