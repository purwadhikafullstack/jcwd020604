module.exports = (sequelize, Sequelize) => {
	const product_images = sequelize.define(
		"product_images",
		{
			product_image: Sequelize.STRING,
		},
		{
			paranoid: true,
		}
	);
	return product_images;
};
