const db = require("../models");
const Joi = require("joi");
const { Op } = require('sequelize');

const ordersController = {
    getAllOrder: async (req, res) => {
        try {
            const { status, warehouse_id } = req.query;
			const limit = 3;

            const page = req?.query?.page || 1;
			let offset = (parseInt(page) - 1) * limit;

            let whereClause = {};

            if (status) {
				whereClause["$status$"] = {
					[Op.like]: `${status}`,
				};
			}

            if (warehouse_id) {
				whereClause["$orders.warehouse_id$"] = {
					[Op.like]: `${warehouse_id}`,
				};
			}

            const orders = await db.orders.findAndCountAll({
                where: {
                   ...whereClause,
                },
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
                    {model: db.users,
                        include: [{model: db.addresses}]
                    },
                ],
                distinct: true,
            });
            res.status(200).json({
                count: orders.count,
                rows: orders.rows.slice(offset, limit * page)
            });
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
                    {model: db.users,
                        include: [{model: db.addresses}]
                    },
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

    adminConfirmOrderPayment: async (req, res) => {
        try {
            const { id } = req.params;
            const { action } = req.body; // 'accept' atau 'reject'
        
            // Temukan pesanan berdasarkan ID
            const order = await db.orders.findByPk(id);
        
            if (!order) {
              return res.status(404).json({ message: "Order not found" });
            }
        
            if (action === "accept") {
              // Periksa apakah status pesanan memenuhi syarat untuk konfirmasi bukti pembayaran
              if (order.status !== "WAITING_PAYMENT") {
                return res.status(400).json({ message: "Invalid order status for confirmation proof of payment" });
              }
        
              // Update status pesanan menjadi "PROCESSING"
              order.status = "PROCESSING";
              await order.save();

              return res.status(200).json({ message: "Payment received, order status updated to Processed" });

            } else if (action === "reject") {
              // Periksa apakah status pesanan memenuhi syarat untuk menolak bukti pembayaran
              if (order.status !== "WAITING_PAYMENT") {
                return res.status(400).json({ message: "Invalid order status to refuse proof of payment" });
              }
        
              // Update status pesanan menjadi "WAITING_PAYMENT"
              order.status = "WAITING_PAYMENT";
              await order.save();
        
              return res.status(200).json({ message: "Payment is rejected, order status is updated to Waiting for Payment" });
              
            } else {
              return res.status(400).json({ message: "Invalid action" });
            }
            
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "There was an error while processing the payment" });
          }
    },

    adminCancelOrder: async (req, res) => {
        try {
          const { id } = req.params;
          const order = await db.orders.findByPk(id);
    
          if (!order) {
            return res.status(404).json({ message: "Order not found" });
          }
    
          if (order.status === "DELIVERY" || order.status === "CANCELLED" || order.status === "DONE") {
            return res.status(400).json({ message: "Order cannot be cancelled at this status" });
          }
    
          order.status = "CANCELLED";
          await order.save();
    
          return res.status(200).json({ message: "Order cancelled successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "An error occurred while cancelling the order" });
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