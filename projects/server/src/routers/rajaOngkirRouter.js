const express = require("express");
const router = express.Router();
const rajaOngkirController = require("../controllers").rajaOngkirController;

router.get("/province/", rajaOngkirController.getAllProvince);
router.get("/city/", rajaOngkirController.getAllCity);
router.post("/cost/", rajaOngkirController.getCost);
router.get("/geocode/:address", rajaOngkirController.getLocation);

module.exports = router;
