const db = require("../models");
const Joi = require("joi");

const productController = {
	insert: async (req, res) => {
		const t = await db.sequelize.transaction();
		const { product_name, product_detail, price, weight, category_id } =
			req.body;

		const productSchema = Joi.object({
			product_name: Joi.string().required(),
			product_detail: Joi.string().required(),
			price: Joi.number().required(),
			weight: Joi.number().required(),
			category_id: Joi.number().required(),
		});

		const validation = productSchema.validate({
			product_name,
			product_detail,
			price,
			weight,
			category_id,
		});

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			const existingProduct = await db.products.findOne({
				where: { product_name },
			});

			if (existingProduct) {
				throw new Error("Product with the same name already exists");
			}
			const product = await db.products.create(
				{
					product_name,
					product_detail,
					price,
					weight,
					category_id,
				},
				{ transaction: t }
			);
			const imageUrls = []; // Array to store the image URLs
			const productId = product.id;
			// Loop through each uploaded file
			for (const file of req.files) {
				const { filename } = file;
				const imageUrl = process.env.product_img + filename;
				imageUrls.push({ product_image: imageUrl, product_id: productId });
			}
			await db.product_images.bulkCreate(imageUrls, { transaction: t });
			await t.commit();
			res.send(product);
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
	editProduct: async (req, res) => {
		const { product_name, product_detail, price, weight, category_id } =
			req.body;
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			product_name: Joi.string().required(),
			product_detail: Joi.string().required(),
			price: Joi.number().min(0).required(),
			weight: Joi.number().min(0).required(),
			category_id: Joi.number().required(),
		});

		const validation = schema.validate({
			product_name,
			product_detail,
			price,
			weight,
			category_id,
		});

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			const existingProduct = await db.products.findOne({
				where: {
					product_name,
					id: { [db.Sequelize.Op.not]: id },
				},
			});

			if (existingProduct) {
				return res
					.status(409)
					.send({ message: "Product name already exists." });
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
					where: { id: id },
					transaction: t,
				}
			);

			if (req.files && req.files.length > 0) {
				const imageUrls = []; // Array to store the image URLs

				// Loop through each uploaded file (similar to the insert function)
				for (const file of req.files) {
					const { filename } = file;
					const imageUrl = process.env.product_img + filename;
					imageUrls.push({ product_image: imageUrl, product_id: id });
				}

				// Delete existing product images
				await db.product_images.destroy(
					{
						where: { product_id: id },
					},
					{ transaction: t }
				);
				await db.product_images.bulkCreate(imageUrls, { transaction: t });
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
