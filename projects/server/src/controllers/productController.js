const { Op, where } = require("sequelize");
const db = require("../models");

const productController = {
	getAll: async (req, res) => {
		try {
			const { category_id, sort, search, page } = req.query;
			const where = {};
			const limit = 20;
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
						// { model: db.warehouses, as: "warehouses" },
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
		try {
			const { uuid } = req.params;
			await db.products
				.findOne({
					where: { uuid },
					include: [
						{ model: db.product_images, as: "product_images" },
						{ model: db.stocks, as: "stocks" },
					],
					// raw: true,
				})
				.then((result) => res.send(result));
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	insert: async (req, res) => {
		try {
			const { product_name, product_detail, price, weight, category_id } =
				req.body;

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
			});

			const productId = product.id;

			for (const imageUrl of imageUrls) {
				await db.product_images.create({
					product_image: imageUrl,
					product_id: productId,
				});
			}
			res.send(product);
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
	deleteProduct: async (req, res) => {
		try {
			await db.products.destroy({ where: { id: req.params.id } });
			await db.product_images.destroy({ where: { product_id: req.params.id } });
			await db.stocks.destroy({ where: { product_id: req.params.id } });
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
			const { id } = req.params;

			const imageUrls = [];

			for (const file of req.files) {
				const { filename } = file;
				const imageUrl = process.env.product_img + filename;
				imageUrls.push(imageUrl);
			}

			// Update the product
			const updatedProduct = await db.products.update(
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
				}
			);

			// Delete existing product images
			await db.product_images.destroy({ where: { product_id: id } });

			// Create product_images entries for each image
			for (const imageUrl of imageUrls) {
				await db.product_images.create({
					product_image: imageUrl,
					product_id: id,
				});
			}

			res.send(updatedProduct[1][0]);
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
};

module.exports = productController;
