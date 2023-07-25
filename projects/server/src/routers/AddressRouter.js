const express = require("express");
const router = express.Router();
const addressController = require("../controllers").addressController;

router.get("/getAll/province/", addressController.getAllProvince);
router.get("/getAll/city/", addressController.getAllCity);

router.post("/", addressController.insertAddress);
router.patch("/:id", addressController.editAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;