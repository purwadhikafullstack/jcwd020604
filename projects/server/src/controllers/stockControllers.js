const db = require("../models");

const stockController = {
	addStock: async (req, res) => {
		const t = await db.sequelize.transaction();
		try {
			const { qty, product_id, warehouse_id } = req.body;
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
