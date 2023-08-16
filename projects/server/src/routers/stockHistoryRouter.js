const express = require("express");
const router = express.Router();
const historyController = require("../controllers").stockHistoryController;
const getHistoryController = require("../controllers").getHistoryController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", checkRole.checkWAdmin, getHistoryController.getHistory);
router.post("/", checkRole.checkWAdmin, historyController.addStockHistory);

module.exports = router;
