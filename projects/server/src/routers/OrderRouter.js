const express = require("express");
const router = express.Router();
const ordersController = require("../controllers").ordersController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/orders", checkRole.checkWAdmin, ordersController.getAllOrder);
router.get("/orders/:id", ordersController.getOrderById);
router.get("/order-details/:id", ordersController.getOrderDetailById);
router.patch("/orders/:id", ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;
