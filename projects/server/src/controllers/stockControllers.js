const { Op } = require("sequelize");
const db = require("../models");

const stockController = {
	getStock: async (req, res) => {
		try {
			await db.stocks
				.findAll({
					where: {
						[Op.and]: [
							{
								warehouse_id: {
									[Op.like]: `%${req.query.warehouse_id || ""}%`,
								},
							},
							{
								"$product.product_name$": {
									[Op.like]: `%${req.query.product_name || ""}%`,
								},
							},
						],
					},
					include: [{ model: db.products }, { model: db.warehouses }],
				})
				.then((result) => res.status(200).send(result));
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
	addStock: async (req, res) => {
		const { qty, product_id, warehouse_id } = req.body;
		const t = await db.sequelize.transaction();

		try {
			await db.stocks
				.create(
					{
						qty,
						product_id,
						warehouse_id,
					},
					{ transaction: t }
				)
				.then((result) => res.status(200).send(result));
			await t.commit();
		} catch (err) {
			await t.rollback();
			res.status(500).send({
				message: err.message,
			});
		}
	},
	editStock: async (req, res) => {
		try {
			const { qty } = req.body;
			const { id } = req.params;

			await db.stocks.update(
				{
					qty,
				},
				{
					where: { id },
				}
			);
			res.send({ message: "Stock updated successfully" });
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
	deleteStock: async (req, res) => {
		try {
			await db.stocks.destroy({ where: { id: req.params.id } });
			return res.status(200).send({
				message: "Stock deleted successfully",
			});
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	},
};

module.exports = stockController;
