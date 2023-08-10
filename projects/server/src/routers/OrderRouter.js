const express = require("express");
const router = express.Router();
const ordersController = require("../controllers").ordersController;

router.get("/orders", ordersController.getAllOrder);
router.get("/orders/:id", ordersController.getOrderById);
router.post("/orders", ordersController.createOrder);
router.patch("/orders/:id", ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;
