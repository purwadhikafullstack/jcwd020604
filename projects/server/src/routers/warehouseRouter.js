const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers").warehouseController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", warehouseController.getWarehouse);
router.get("/:id", checkRole.checkAdmin, warehouseController.getWarehouseById);
router.get(
	"/getAll/province/",
	checkRole.checkAdmin,
	warehouseController.getAllProvince
);
router.get(
	"/getAll/city/",
	checkRole.checkAdmin,
	warehouseController.getAllCity
);

router.post("/", checkRole.checkAdmin, warehouseController.insertWarehouse);
router.patch("/:id", checkRole.checkAdmin, warehouseController.editWarehouse);
router.delete(
	"/:id",
	checkRole.checkAdmin,
	warehouseController.deleteWarehouse
);

module.exports = router;
