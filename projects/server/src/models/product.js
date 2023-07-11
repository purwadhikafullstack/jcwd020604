module.exports = (sequelize, Sequelize) => {
	const products = sequelize.define(
		"products",
		{
			product_name: Sequelize.STRING,
			product_detail: Sequelize.TEXT,
			price: Sequelize.INTEGER,
			weight: Sequelize.INTEGER,
		},
		{
			paranoid: true,
		}
	);
	return products;
};
