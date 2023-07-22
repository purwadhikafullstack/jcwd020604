const { Op, where } = require("sequelize");
const db = require("../models");
const Joi = require("joi");

const productController = {
	getAll: async (req, res) => {
		try {
			const { category_id, sort, search, page } = req.query;
			const where = {};
			const limit = 12;
			let offset = 0;

			if (category_id) {
				where.category_id = category_id;
			}

			if (page && parseInt(page) > 1) {
				offset = (parseInt(page) - 1) * limit;
			}

			const sortOptions = {
				priceAsc: [["price", "ASC"]],
				priceDesc: [["price", "DESC"]],
				categoryAsc: [["category_id", "ASC"]],
				categoryDesc: [["category_id", "DESC"]],
				newest: [["createdAt", "DESC"]],
			};
			const sortOrder = sortOptions[sort] || null;

			const searchOptions = {
				product_name: {
					[Op.like]: `%${search}%`,
				},
			};

			const searchFilter = search ? searchOptions : null;

			await db.products
				.findAndCountAll({
					where: {
						...where,
						...searchFilter,
					},
					include: [
						{ model: db.product_images, as: "product_images" },
						{ model: db.stocks, as: "stocks" },
						{ model: db.categories },
					],
					order: sortOrder,
					limit: limit,
					distinct: true,
					offset: offset,
					// raw: true,
				})
				.then((result) => res.send(result));
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	// getProductById: async (req, res) => {
	// 	try {
	// 		const { id } = req.params;
	// 		await db.products
	// 			.findOne({
	// 				where: { id },
	// 				include: { model: db.product_images, as: "product_images" },
	// 			})
	// 			.then((result) => res.send(result));
	// 	} catch (err) {
	// 		res.status(500).send({ message: err.message });
	// 	}
	// },
	getProductByUuid: async (req, res) => {
		const { uuid } = req.params;
		try {
			const product = await db.products.findOne({
				where: { uuid },
				include: [
					{ model: db.product_images, as: "product_images" },
					{ model: db.stocks, as: "stocks" },
				],
			});
			if (!product) {
				return res.status(404).send({ message: "Product not found" });
			}
			return res.send(product);
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	insert: async (req, res) => {
		const t = await db.sequelize.transaction();

		const productSchema = Joi.object({
			product_name: Joi.string().required(),
			product_detail: Joi.string().required(),
			price: Joi.number().required(),
			weight: Joi.number().required(),
			category_id: Joi.number().required(),
		});

		const { error } = productSchema.validate(req.body);

		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		try {
			const { product_name, product_detail, price, weight, category_id } =
				req.body;

			// Check if the product_name already exists
			const existingProduct = await db.products.findOne({
				where: { product_name },
			});

			if (existingProduct) {
				throw new Error("Product with the same name already exists");
			}

			const imageUrls = []; // Array to store the image URLs

			// Loop through each uploaded file
			for (const file of req.files) {
				const { filename } = file;
				const imageUrl = process.env.product_img + filename;
				imageUrls.push(imageUrl);
			}

			const product = await db.products.create({
				product_name,
				product_detail,
				price,
				weight,
				category_id,
				transaction: t,
			});

			const productId = product.id;

			for (const imageUrl of imageUrls) {
				await db.product_images.create(
					{
						product_image: imageUrl,
						product_id: productId,
					},
					{ transaction: t }
				);
			}
			await t.commit();

			res.send(product);
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
	editProduct: async (req, res) => {
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			product_name: Joi.string().required(),
			product_detail: Joi.string().required(),
			price: Joi.number().required(),
			weight: Joi.number().required(),
			category_id: Joi.number().required(),
		});

		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		const { product_name, product_detail, price, weight, category_id } =
			req.body;
		const { id } = req.params;

		try {
			const existingProduct = await db.products.findOne({
				where: { product_name },
			});

			if (existingProduct && existingProduct.id !== id) {
				return res
					.status(409)
					.send({ message: "Product name already exists." });
			}

			const imageUrls = [];

			for (const file of req.files) {
				const { filename } = file;
				const imageUrl = process.env.product_img + filename;
				imageUrls.push(imageUrl);
			}

			// Update the product
			await db.products.update(
				{
					product_name,
					product_detail,
					price,
					weight,
					category_id,
				},
				{
					where: { id },
					returning: true,
					transaction: t,
				}
			);

			// Delete existing product images
			await db.product_images.destroy({
				where: { product_id: id },
				transaction: t,
			});

			// Create product_images entries for each image
			for (const imageUrl of imageUrls) {
				await db.product_images.create(
					{
						product_image: imageUrl,
						product_id: id,
					},
					{ transaction: t }
				);
			}
			await t.commit();
			res.status(200).send({ message: "Product updated successfully." });
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
	deleteProduct: async (req, res) => {
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		try {
			const existingProduct = await db.products.findOne({ where: { id } });

			if (!existingProduct) {
				return res.status(404).send({ message: "Product not found." });
			}

			await db.products.destroy({ where: { id }, transaction: t });
			await db.product_images.destroy({
				where: { product_id: id },
				transaction: t,
			});
			await db.stocks.destroy({ where: { product_id: id }, transaction: t });

			await t.commit();

			return res.status(200).send({
				message: "Product deleted",
			});
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
};

module.exports = productController;
