"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file.indexOf(".test.js") === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.addresses = require("./address")(sequelize, Sequelize); // id: user
db.carts = require("./cart")(sequelize, Sequelize); // id: stock
db.categories = require("./category")(sequelize, Sequelize);
db.orders = require("./order")(sequelize, Sequelize); // id: user, address
db.order_details = require("./orderDetail")(sequelize, Sequelize); // id: stock, order
db.products = require("./product")(sequelize, Sequelize); // id: category
db.product_images = require("./productImage")(sequelize, Sequelize); // id: product
db.stocks = require("./stock")(sequelize, Sequelize); // id: product, warehouse
db.stock_histories = require("./stockHistory")(sequelize, Sequelize); // id: stock
db.stock_mutations = require("./stockMutation")(sequelize, Sequelize); // id: from_warehouse, to_warehouse, stock
db.tokens = require("./token")(sequelize, Sequelize); // id: user
db.users = require("./user")(sequelize, Sequelize); // id: warehouse
db.warehouses = require("./warehouse")(sequelize, Sequelize); // id: product

// db.addresses foreignKey
db.users.hasMany(db.addresses, { foreignKey: "user_id", targetKey: "id" });
db.addresses.belongsTo(db.users, { foreignKey: "user_id" });

// // db.carts foreignKey
// db.stocks.hasMany(db.carts, { foreignKey: "stock_id", targetKey: "id" });

// // db.orders foreignKey
// db.users.hasMany(db.orders, { foreignKey: "user_id", targetKey: "id" });
// db.addresses.hasMany(db.orders, { foreignKey: "address_id", targetKey: "id" });

// // db.orderDetails foreignKey
// db.stocks.hasMany(db.orderDetails, { foreignKey: "stock_id", targetKey: "id" });
// db.orders.hasMany(db.orderDetails, { foreignKey: "order_id", targetKey: "id" });

// db.products foreignKey
db.categories.hasMany(db.products, {
	foreignKey: "category_id",
	targetKey: "id",
});

db.products.belongsTo(db.categories, {
	foreignKey: "category_id",
});

// db.product_images foreignKey
db.products.hasMany(db.product_images, {
	foreignKey: "product_id",
	targetKey: "id",
});

db.product_images.belongsTo(db.products, {
	foreignKey: "product_id",
});

// db.stocks foreignKey
db.products.hasMany(db.stocks, {
	foreignKey: "product_id",
	targetKey: "id",
});
db.warehouses.hasMany(db.stocks, {
	foreignKey: "warehouse_id",
	targetKey: "id",
});

db.stocks.belongsTo(db.products, {
	foreignKey: "product_id",
});

db.stocks.belongsTo(db.warehouses, {
	foreignKey: "warehouse_id",
});

module.exports = db;
