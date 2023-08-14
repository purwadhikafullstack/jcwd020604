module.exports = (sequelize, Sequelize) => {
	const warehouses = sequelize.define(
		"warehouses",
		{
			warehouse_name: Sequelize.STRING,
			address: Sequelize.STRING,
			province: Sequelize.STRING,
			city: Sequelize.STRING,
			district: Sequelize.STRING,
			latitude: Sequelize.STRING,
			longitude: Sequelize.STRING,
			phone_number: Sequelize.STRING,
		},
		{
			paranoid: true,
		}
	);
	return warehouses;
};
