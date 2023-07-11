module.exports = (sequelize, Sequelize) => {
	const warehouses = sequelize.define(
		"warehouses",
		{
			name: Sequelize.STRING,
			address: Sequelize.STRING,
			province: Sequelize.STRING,
			city: Sequelize.STRING,
			district: Sequelize.STRING,
			latitude: Sequelize.INTEGER,
			longitude: Sequelize.INTEGER,
		},
		{
			paranoid: true,
		}
	);
	return warehouses;
};
