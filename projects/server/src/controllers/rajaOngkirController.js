const axios = require("axios");

const rajaOngkirContorller = {
	getAllProvince: async (req, res) => {
		try {
			const result = await axios.get(
				"https://api.rajaongkir.com/starter/province",
				{
					headers: {
						key: "372e0adb26e2feae1f4ccf3c2f1ccb3a",
					},
				}
			);
			res.send(result.data);
		} catch (err) {
			console.log(err);
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
						key: "372e0adb26e2feae1f4ccf3c2f1ccb3a",
					},
				}
			);
			res.send(result.data);
		} catch (err) {
			console.log(err);
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getCost: async (req, res) => {
		try {
			const { origin, destination, weight, courier } = req.body;
			const result = await axios.post(
				"https://api.rajaongkir.com/starter/cost",
				{
					origin: origin,
					destination: destination,
					weight: weight,
					courier: courier,
				},
				{
					headers: {
						key: "372e0adb26e2feae1f4ccf3c2f1ccb3a",
					},
				}
			);
			res.send(result.data);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getLocation: async (req, res) => {
		try {
			const address = req.params.address;
			const encodedAddress = encodeURIComponent(address);
			const apiKey = "9d90da72d810405f81098da816171213";

			const response = await axios.get(
				`https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`
			);
			const { results } = response.data;
			if (results.length > 0) {
				const { geometry } = results[0];
				const { lat, lng } = geometry;

				res.status(200).send({
					address: address,
					latitude: lat,
					longitude: lng,
				});
			} else {
				res.status(404).send({
					message: "Location not found",
				});
			}
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
};

module.exports = rajaOngkirContorller;
