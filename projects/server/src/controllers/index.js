const productController = require("./productController");
const categoryController = require("./categoryController");
const stockController = require("./stockControllers");
const warehouseController = require("./warehouseController");
const userController = require("./UserController");
const addressController = require("./AddressController");
const stockHistoryControllers = require("./stockHistoryControllers");
const stockMutationControllers = require("./stockMutationController");
const cartControllers = require("./cartController");
const ordersController = require('./OrderController');

module.exports = {
	productController,
	categoryController,
	stockController,
	warehouseController,
	userController,
	addressController,
	stockHistoryControllers,
	stockMutationControllers,
	cartControllers,
	ordersController
};
