const express = require("express");
const router = express.Router();
const handlePaymentController = require("../controllers").handlePaymentController;

router.patch("/payment/confirm-payment/:id", handlePaymentController.adminConfirmOrderPayment);

module.exports = router;