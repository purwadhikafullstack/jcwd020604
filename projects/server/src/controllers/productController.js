const { Op, where } = require("sequelize");
const db = require("../models");

const productController = {
	getAll: async (req, res) => {
		try {
			const { category_id } = req.query;
			const where = {};
			if (category_id) {
				where.category_id = category_id;
			}
			await db.products
				.findAll({ where: where })
				.then((result) => res.send(result));
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	getProductById: async (req, res) => {
		try {
			const { id } = req.params;
			await db.products
				.findOne({ where: { id } })
				.then((result) => res.send(result));
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	insert: async (req, res) => {
		try {
			const { product_name, product_detail, price, weight, category_id } =
				req.body;
			await db.products
				.create({
					product_name,
					product_detail,
					price,
					weight,
					category_id,
				})
				.then((result) => res.send(result));
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
	deleteProduct: async (req, res) => {
		try {
			await db.products.destroy({ where: { id: req.params.id } });
			return res.status(200).send({
				message: "Product deleted",
			});
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	editProduct: async (req, res) => {
		try {
			const { product_name, product_detail, price, weight, category_id } =
				req.body;
			await db.products
				.update(
					{
						product_name,
						product_detail,
						price,
						weight,
						category_id,
					},
					{
						where: { id: req.params.id },
					}
				)
				.then((result) => res.send(result));
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
};

module.exports = productController;
