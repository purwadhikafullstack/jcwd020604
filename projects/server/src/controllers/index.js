const productController = require("./productController");
const categoryController = require("./categoryController");
const stockController = require("./stockControllers");
const warehouseController = require("./warehouseController");
const userController = require("./UserController");
const addressController = require("./AddressController");
const stockHistoryControllers = require("./stockHistoryControllers");

module.exports = {
	productController,
	categoryController,
	stockController,
	warehouseController,
	userController,
	addressController,
	stockHistoryControllers,
};
