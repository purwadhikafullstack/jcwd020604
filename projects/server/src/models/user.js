module.exports = (sequelize, Sequelize) => {
	const users = sequelize.define(
		"users",
		{
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: Sequelize.STRING,
			fullname: Sequelize.STRING,
			avatar_url: Sequelize.STRING,
			role: Sequelize.ENUM("USER", "W_ADMIN", "ADMIN"),
			verified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
		{
			paranoid: true,
		}
	);
	return users;
};
