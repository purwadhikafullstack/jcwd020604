const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers").warehouseController;

router.get("/", warehouseController.getWarehouse);
router.get("/:id", warehouseController.getWarehouseById);
router.get("/getAll/province/", warehouseController.getAllProvince);
router.get("/getAll/city/", warehouseController.getAllCity);
router.post("/assign", warehouseController.assignAdminUserToWarehouse);

router.post("/", warehouseController.insertWarehouse);
router.patch("/:id", warehouseController.editWarehouse);
router.delete("/:id", warehouseController.deleteWarehouse);

module.exports = router;
