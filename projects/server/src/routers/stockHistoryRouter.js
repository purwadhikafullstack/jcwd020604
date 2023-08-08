const express = require("express");
const router = express.Router();
const stockController = require("../controllers").stockHistoryControllers;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", checkRole.checkWAdmin, stockController.getHistory);
router.post("/", checkRole.checkWAdmin, stockController.addStockHistory);

module.exports = router;
