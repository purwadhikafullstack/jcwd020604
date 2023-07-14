module.exports = (sequelize, Sequelize) => {
	const product_images = sequelize.define(
		"product_images",
		{
			product_image: {
				type: Sequelize.STRING,
				defaultValues: null,
			},
		},
		{
			paranoid: true,
		}
	);
	return product_images;
};
