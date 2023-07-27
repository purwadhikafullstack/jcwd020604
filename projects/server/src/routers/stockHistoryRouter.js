const express = require("express");
const router = express.Router();
const stockController = require("../controllers").stockHistoryControllers;

router.get("/", stockController.getHistory);
router.post("/", stockController.addStockHistory);

module.exports = router;
