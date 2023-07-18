const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers").warehouseController;

router.get("/", warehouseController.getWarehouse);

router.get("/", warehouseController.insert);

module.exports = router;
