const db = require("../models");

const productImageController = {
	insertImg: async (req, res) => {
		try {
			const { filename } = req.file;
			await db.productImages
				.create({
					product_image: process.env.product_img + filename,
				})
				.then((result) => res.send(result));
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	editImg: async (req, res) => {
		try {
			const { filename } = req.file;
			await db.productImages
				.update(
					{
						product_image: process.env.product_img + filename,
					},
					{
						where: {
							id: req.params.id,
						},
					}
				)
				.then((result) => res.send(result));
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
};

module.exports = productImageController;
