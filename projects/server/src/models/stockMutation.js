module.exports = (sequelize, Sequelize) => {
	const stock_mutations = sequelize.define(
		"stock_mutations",
		{
			mutation_code: Sequelize.STRING,
			qty: Sequelize.INTEGER,
			status: Sequelize.ENUM("APPROVED", "REJECT", "PENDING"),
		},
		{
			paranoid: true,
		}
	);
	return stock_mutations;
};
