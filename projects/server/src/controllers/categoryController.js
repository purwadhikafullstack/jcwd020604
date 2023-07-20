const db = require("../models");
const Joi = require("joi");

const categoryController = {
	getCategory: async (req, res) => {
		try {
			await db.categories
				.findAll()
				.then((result) => res.status(200).send(result));
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getCategoryById: async (req, res) => {
		const { id } = req.params;
		try {
			const category = await db.categories.findOne({ where: { id } });
			if (!category) {
				return res.status(404).send({ message: "Category not found" });
			}
			return res.status(200).send(category);
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
	insertCategory: async (req, res) => {
		const { category_name } = req.body;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			category_name: Joi.string().required(),
		});

		const validation = schema.validate({ category_name });

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			const existingCategory = await db.categories.findOne({
				where: { category_name },
			});

			if (existingCategory) {
				throw new Error("Category with the same name already exists");
			}

			// Create a new category
			const newCategory = await db.categories.create(
				{ category_name },
				{ transaction: t }
			);

			await t.commit(); // Commit the transaction

			res.status(200).send(newCategory);
		} catch (err) {
			await t.rollback();
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	editCategory: async (req, res) => {
		const { category_name } = req.body;
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			category_name: Joi.string().required(),
		});

		const validation = schema.validate({ category_name });

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}
		try {
			const existingCategory = await db.categories.findOne({
				where: { category_name },
			});

			if (existingCategory && existingCategory.id !== id) {
				return res.status(400).send({ message: "Category already exists." });
			}

			await db.categories.update(
				{ category_name },
				{ where: { id: id }, transaction: t }
			);

			await t.commit(); // Commit the transaction

			res.status(200).send({ message: "Category updated successfully." });
		} catch (err) {
			await t.rollback();
			res.status(500).send({ message: err.message });
		}
	},
	deleteCategory: async (req, res) => {
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		try {
			const category = await db.categories.findOne({ where: { id } });

			if (!category) {
				return res.status(404).send({ message: "Category not found." });
			}

			await db.categories.destroy({
				where: { id: id },
				transaction: t,
			});

			await t.commit();

			res.status(200).send({ message: "Category deleted successfully." });
		} catch (err) {
			await t.rollback();
			res.status(500).send({ message: err.message });
		}
	},
};
module.exports = categoryController;
