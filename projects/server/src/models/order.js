module.exports = (sequelize, Sequelize) => {
	const orders = sequelize.define(
		"orders",
		{
			payment_detail: Sequelize.STRING,
			payment_proof: Sequelize.STRING,
			invoice: Sequelize.STRING,
			shipping_cost: Sequelize.INTEGER,
			total_price: Sequelize.INTEGER,
			courier: Sequelize.ENUM("jne", "pos", "tiki"),
			shipping_cost: Sequelize.INTEGER,
			total_price: Sequelize.INTEGER,
			status: Sequelize.ENUM(
				"WAITING_STOCK_TRANSFER",
				"WAITING_PAYMENT",
				"PAYMENT",
				"PROCESSING",
				"DELIVERY",
				"CANCELLED",
				"DONE"
			),
		},
		{
			paranoid: true,
		}
	);
	return orders;
};
