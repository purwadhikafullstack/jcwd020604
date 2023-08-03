const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const stockRouter = require("./stockRouter");
const warehouseRouter = require("./warehouseRouter");
const userRouter = require("./UserRouter");
const addressRouter = require("./AddressRouter");
const stockHistoryRouter = require("./stockHistoryRouter");
const stockMutationRouter = require("./stockMutationRouter");

module.exports = {
	productRouter,
	categoryRouter,
	stockRouter,
	warehouseRouter,
	userRouter,
	addressRouter,
	stockHistoryRouter,
	stockMutationRouter,
};
