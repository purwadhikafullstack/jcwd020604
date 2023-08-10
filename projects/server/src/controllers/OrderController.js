const db = require("../models");

const ordersController = {
    getAllOrder: async (req, res) => {
        try {
            const orders = await db.orders.findAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving order", error: error.message });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await db.orders.findByPk(orderId);
            if (order) {
            res.status(200).json(order);
            } else {
            res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving order", error: error.message });
        }
    },

    createOrder: async (req, res) => {
        try {
            const { payment_detail, payment_proof, invoice, shipping_cost, total_price, courier, status, user_id, address_id } = req.body;
            const newOrder = await db.orders.create(req.body);
            res.status(201).json(newOrder);
          } catch (error) {
            res.status(400).json({ message: "Error creating order", error: error.message });
          }
    },

    updateOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const { payment_detail, payment_proof, invoice, shipping_cost, total_price, courier, status, user_id, address_id } = req.body;
            const [updatedRowsCount] = await db.orders.update(req.body, {
            where: { id: orderId },
            });
            if (updatedRowsCount > 0) {
            res.status(200).json({ message: "Order updated successfully" });
            } else {
            res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating order", error: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        const { id } = req.params;
		const t = await db.sequelize.transaction();

		try {
			const order = await db.orders.findOne({ where: { id } });
			if (!order) {
				return res.status(404).send({ message: "Orders not found." });
			}

			await db.orders.destroy({
				where: { id: id },
				transaction: t,
			});

			await t.commit();
			res.send({ message: "Orders deleted successfully." });
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
    }

}
module.exports = ordersController;