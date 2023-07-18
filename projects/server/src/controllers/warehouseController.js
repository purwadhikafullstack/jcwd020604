const db = require("../models");

const warehouseController = {
	insert: async (req, res) => {
		try {
			const {
				warehouse_name,
				address,
				province,
				city,
				district,
				latitude,
				longitude,
			} = req.body;

			const warehouse = await db.products.create({
				warehouse_name,
				address,
				province,
				city,
				district,
				latitude,
				longitude,
			});
			res.send(warehouse);
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
	getWarehouse: async (req, res) => {
		try {
			await db.warehouses
				.findAll()
				.then((result) => res.status(200).send(result));
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
};
module.exports = warehouseController;
