module.exports = (sequelize, Sequelize) => {
	const addresses = sequelize.define(
		"addresses",
		{
			address: Sequelize.STRING,
			province: Sequelize.STRING,
			city: Sequelize.STRING,
			district: Sequelize.STRING,
			postal_code: Sequelize.STRING,
			latitude: Sequelize.INTEGER,
			longitude: Sequelize.INTEGER,
		},
		{
			paranoid: true,
		}
	);
	return addresses;
};
