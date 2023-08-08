const productController = require("./productController");
const categoryController = require("./categoryController");
const stockController = require("./stockControllers");
const warehouseController = require("./warehouseController");
const userController = require("./UserController");
const addressController = require("./AddressController");
const cartControllers = require("./cartController");

module.exports = {
  productController,
  categoryController,
  stockController,
  warehouseController,
  userController,
  addressController,
  cartControllers,
};
