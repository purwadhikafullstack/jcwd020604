const express = require("express");
const router = express.Router();
const productImageController = require("../controllers").productImageController;
const { fileUploader, upload } = require("../middlewares/multer");

router.post(
	"/",
	fileUploader({ destinationFolder: "productImg" }).single("productImg"),
	productImageController.insertImg
);
router.patch(
	"/:id",
	fileUploader({
		destinationFolder: "productImg",
	}).single("productImg"),
	productImageController.editImg
);

module.exports = router;
