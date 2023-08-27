const express = require("express");
const router = express.Router();
const handleActionOrderController = require("../controllers").handleActionOrderController;

router.patch("/orders/sending-order/:id", handleActionOrderController.adminSendOrder);
router.put("/orders/cancel-order/:id", handleActionOrderController.adminCancelOrder);

module.exports = router;