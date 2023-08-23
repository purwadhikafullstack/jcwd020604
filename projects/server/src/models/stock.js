module.exports = (sequelize, Sequelize) => {
	const stocks = sequelize.define(
		"stocks",
		{
			qty: Sequelize.INTEGER,
			booked: Sequelize.INTEGER,
		},
		{
			paranoid: true,
		}
	);
	return stocks;
};
