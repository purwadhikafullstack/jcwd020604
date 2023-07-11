module.exports = (sequelize, Sequelize) => {
	const stock_histories = sequelize.define(
		"stock_histories",
		{
			qty: Sequelize.INTEGER,
			status: Sequelize.ENUM("IN", "OUT"),
			reference: Sequelize.STRING,
		},
		{
			paranoid: true,
		}
	);
	return stock_histories;
};
