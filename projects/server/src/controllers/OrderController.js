const db = require("../models");
const Joi = require("joi");

const ordersController = {
    getAllOrder: async (req, res) => {
        try {
            const orders = await db.orders.findAll({
                include: [
                    {model: db.order_details, 
                        include: [{model: db.stocks, 
                            include: [{model: db.products,
                                include: [{model: db.product_images}]
                        }, 
                            {model: db.warehouses}
                        ]
                    }]
                },
                    {model: db.users}
                ],
            });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving order", error: error.message });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await db.orders.findOne({
                where: {id},
                include: [
                    {model: db.order_details, 
                        include: [{model: db.stocks, 
                            include: [{model: db.products,
                                include: [{model: db.product_images}]
                        }, 
                            {model: db.warehouses}
                        ]
                    }]
                },
                    {model: db.users}
                ],
            });
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
        const t = await db.sequelize.transaction();

        const { payment_detail, payment_proof, invoice, shipping_cost, total_price, courier, status, user_id, address_id } = req.body;

        const orderSchema = Joi.object({
            payment_detail: Joi.string().required(),
            payment_proof: Joi.string().required(),
            invoice: Joi.string().required(),
            shipping_cost: Joi.number().required(),
            total_price: Joi.number().required(),
            courier: Joi.string().required(),
            status: Joi.string().required(),
            user_id: Joi.number().required(),
            address_id: Joi.number().required(),
        });

        const validation = orderSchema.validate({
            payment_detail,
            payment_proof,
            invoice,
            shipping_cost,
            total_price,
            courier,
            status,
            user_id,
            address_id
        });

        if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}
    
        try {
            const existingOrder = await db.orders.findOne({
				where: { payment_detail, payment_proof, invoice },
			});

			if (existingOrder) {
				throw new Error("Orders with the same name already exists");
			}

            const newOrder = await db.orders.create(req.body, {
                transaction: t,
            });

            await t.commit();

            res.status(201).json(newOrder);
        } catch (error) {
            await t.rollback();
            res.status(400).json({ message: "Error creating order", error: error.message });
        }
    },

    createOrderDetail: async (req, res) => {
        const t = await db.sequelize.transaction();

        const { qty, price, stock_id, order_id } = req.body;

        const orderSchema = Joi.object({
            qty: Joi.number().required(),
            price: Joi.number().required(),
            stock_id: Joi.number().required(),
            order_id: Joi.number().required(),
        });

        const validation = orderSchema.validate({
            qty, price, stock_id, order_id
        });

        if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}
    
        try {
            const existingOrder = await db.order_details.findOne({
				where: { order_id },
                include: [
                    {model: db.stocks}
                ],
			});

			if (existingOrder) {
				throw new Error("Orders with the same name already exists");
			}

            const newOrder = await db.order_details.create(req.body, {
                transaction: t,
            });

            await t.commit();

            res.status(201).json(newOrder);
        } catch (error) {
            await t.rollback();
            res.status(400).json({ message: "Error creating order", error: error.message });
        }
    },

    getOrderDetailById: async (req, res) => {
        try {
            const { id } = req.params;
            const order_detail = await db.order_details.findOne({
                where: {id},
                include: [
                    {model: db.stocks}
                ],
            });
            if (order_detail) {
            res.status(200).json(order_detail);
            } else {
            res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving order", error: error.message });
        }
    },
    
    updateOrder: async (req, res) => {
        const { id } = req.params;
        const { payment_detail, payment_proof, invoice, shipping_cost, total_price, courier, status, user_id, address_id } = req.body;
    
        const t = await db.sequelize.transaction();
    
        try {
            const [updatedRows] = await db.orders.update(req.body, {
                where: { id: id },
                transaction: t,
            });
    
            if (updatedRows > 0) {
                await t.commit();
                res.status(200).json({ message: "Order updated successfully" });
            } else {
                await t.rollback();
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            await t.rollback();
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