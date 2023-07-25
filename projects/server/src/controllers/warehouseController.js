const db = require("../models");
const axios = require("axios");
const Joi = require("joi");

const warehouseController = {
	getWarehouse: async (req, res) => {
		try {
			const warehouses = await db.warehouses.findAll();

			const sortedWarehouses = warehouses.sort((a, b) => {
				return a.warehouse_name.localeCompare(b.warehouse_name);
			});

			res.status(200).send(sortedWarehouses);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getWarehouseById: async (req, res) => {
		const { id } = req.params;
		try {
			const warehouse = await db.warehouses.findOne({ where: { id } });
			if (!warehouse) {
				return res.status(404).send({ message: "Warehouse not found" });
			}
			return res.send(warehouse);
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
	getAllProvince: async (req, res) => {
		try {
			const result = await axios.get(
				"https://api.rajaongkir.com/starter/province",
				{
					headers: {
						key: process.env.RAJA_ONGKIR_API,
					},
				}
			);
			res.send(result.data.rajaongkir.results);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getAllCity: async (req, res) => {
		try {
			const result = await axios.get(
				"https://api.rajaongkir.com/starter/city",
				{
					headers: {
						key: process.env.RAJA_ONGKIR_API,
					},
				}
			);
			res.send(result.data.rajaongkir.results);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	insertWarehouse: async (req, res) => {
		const t = await db.sequelize.transaction();
		const warehouseSchema = Joi.object({
			warehouse_name: Joi.string().required(),
			address: Joi.string().required(),
			province: Joi.string().required(),
			city: Joi.string().required(),
			district: Joi.string().required(),
		});
		const { error, value } = warehouseSchema.validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		try {
			const { warehouse_name, address, district, city, province } = value;

			// Check if a warehouse with the same warehouse_name already exists
			const existingWarehouse = await db.warehouses.findOne({
				where: { warehouse_name },
			});

			if (existingWarehouse) {
				throw new Error("Warehouse with this name already exists.");
			}

			const response = await axios.get(
				"https://api.opencagedata.com/geocode/v1/json",
				{
					params: {
						q: `${address}, ${district}, ${province}, ${city}`,
						countrycode: "id",
						limit: 1,
						key: process.env.GEOCODE_API_KEY,
					},
				}
			);

			const { lat, lng } = response.data.results[0].geometry;

			// Create a new warehouse record with the retrieved latitude and longitude
			const warehouse = await db.warehouses.create(
				{
					warehouse_name,
					address,
					province,
					city,
					district,
					latitude: lat,
					longitude: lng,
				},
				{ transaction: t }
			);
			await t.commit();
			res.send(warehouse);
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
	editWarehouse: async (req, res) => {
		const {
			// warehouse_name,
			address,
			province,
			city,
			district,
		} = req.body;
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		const schema = Joi.object({
			// warehouse_name: Joi.string().required(),
			address: Joi.string().required(),
			province: Joi.string().required(),
			city: Joi.string().required(),
			district: Joi.string().required(),
		});

		const validation = schema.validate({
			// warehouse_name,
			address,
			province,
			city,
			district,
		});

		if (validation.error) {
			return res
				.status(400)
				.send({ message: validation.error.details[0].message });
		}

		try {
			// const existingWarehouse = await db.warehouses.findOne({
			// 	where: { warehouse_name },
			// });

			// if (existingWarehouse && existingWarehouse.id !== id) {
			// 	return res
			// 		.status(400)
			// 		.send({ message: "Warehouse name already exists." });
			// }

			const response = await axios.get(
				"https://api.opencagedata.com/geocode/v1/json",
				{
					params: {
						q: `${address}, ${district}, ${province}, ${city}`,
						countrycode: "id",
						limit: 1,
						key: process.env.GEOCODE_API_KEY,
					},
				}
			);

			const { lat, lng } = response.data.results[0].geometry;

			await db.warehouses.update(
				{
					// warehouse_name,
					address,
					province,
					city,
					district,
					latitude: lat,
					longitude: lng,
				},
				{ where: { id }, returning: true, transaction: t }
			);

			await t.commit();
			res.status(200).send({ message: "Warehouse updated successfully." });
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},

	deleteWarehouse: async (req, res) => {
		const { id } = req.params;
		const t = await db.sequelize.transaction();

		try {
			const warehouse = await db.warehouses.findOne({ where: { id } });
			if (!warehouse) {
				return res.status(404).send({ message: "Warehouse not found." });
			}

			await db.warehouses.destroy({
				where: { id: id },
				transaction: t,
			});

			await t.commit();
			res.send({ message: "Warehouse deleted successfully." });
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},
};
module.exports = warehouseController;
