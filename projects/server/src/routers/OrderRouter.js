const express = require("express");
const router = express.Router();
const ordersController = require("../controllers").ordersController;

router.get("/orders", ordersController.getAllOrder);
router.get("/orders/:id", ordersController.getOrderById);
router.get("/order-details/:id", ordersController.getOrderDetailById);
router.post("/orders", ordersController.createOrder);
router.patch("/orders/confirm-payment/:id", ordersController.confirmOrderPayment);
router.post("/order-detail", ordersController.createOrderDetail);
router.patch("/orders/:id", ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;
