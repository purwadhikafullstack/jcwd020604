const db = require("../models");
const Joi = require("joi");
const stockHistory = require("./stockHistoryController");

const handleStockMutation = {
	confirmMutation: async (req, res) => {
		const { status } = req.body;
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			status: Joi.string().valid("APPROVED", "REJECTED").required(),
		});

		const validation = schema.validate({
			status,
		});

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			const pendingMutation = await db.stock_mutations.findOne({
				where: {
					id: id,
					status: "PENDING",
				},
				include: [
					{
						model: db.stocks,
						include: [{ model: db.products }],
					},
				],
			});
			if (!pendingMutation) {
				return res.status(404).send({
					message: "Pending mutation not found or already processed.",
				});
			}

			if (status === "APPROVED") {
				const existingStock = await db.stocks.findOne({
					where: {
						id: pendingMutation.stock_id,
						warehouse_id: pendingMutation.from_warehouse_id,
					},
				});

				if (!existingStock || existingStock.qty < pendingMutation.qty) {
					return res
						.status(404)
						.send({ message: "Insufficient stock from selected warehouse." });
				}

				// Update stock quantities
				await db.stocks.update(
					{
						qty: existingStock.qty - pendingMutation.qty,
					},
					{
						where: { id: existingStock.id },
						transaction: t,
					}
				);
				const destinationStock = await db.stocks.findOne({
					where: {
						product_id: pendingMutation.stock.product_id,
						warehouse_id: pendingMutation.to_warehouse_id,
					},
				});

				if (destinationStock) {
					await db.stocks.update(
						{
							qty: destinationStock.qty + pendingMutation.qty,
						},
						{
							where: { id: destinationStock.id },
							transaction: t,
						}
					);
				} else {
					await db.stocks.create(
						{
							product_id: pendingMutation.stock.product_id,
							warehouse_id: pendingMutation.to_warehouse_id,
							qty: pendingMutation.qty,
						},
						{
							transaction: t,
						}
					);
				}

				await db.stock_mutations.update(
					{ status: "APPROVED" },
					{ where: { id: id }, transaction: t }
				);

				console.log(existingStock.dataValues.qty);

				// Log stock history for the mutation
				// await stockHistory.addStockHistory(
				// 	existingStock.dataValues,
				// 	"OUT",
				// 	"MUTATION",
				// 	pendingMutation.qty
				// );
				// await stockHistory.addStockHistory(
				// 	existingStock.dataValues,
				// 	"IN",
				// 	"MUTATION",
				// 	destinationStock.qty
				// );

				await t.commit();
				return res.status(200).send({ message: "Stock mutation confirmed." });
			} else if (status === "REJECTED") {
				await db.stock_mutations.update(
					{ status: "REJECTED" },
					{ where: { id: id }, transaction: t }
				);

				await t.commit();
				return res.status(200).send({ message: "Stock mutation rejected." });
			} else {
				return res.status(400).send({
					message: "Invalid status value. Expected 'confirmed' or 'rejected'.",
				});
			}
		} catch (err) {
			console.log(err);
			await t.rollback();
			res.status(500).send({ message: err.message });
		}
	},
};

module.exports = handleStockMutation;
