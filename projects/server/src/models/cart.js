module.exports = (sequelize, Sequelize) => {
	const carts = sequelize.define(
		"carts",
		{
			qty: Sequelize.INTEGER,
			price: Sequelize.INTEGER,
		},
		{
			paranoid: true,
		}
	);
	return carts;
};
