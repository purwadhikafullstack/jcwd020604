const express = require("express");
const router = express.Router();
const productController = require("../controllers").productController;

router.get("/", productController.getAll);
router.get("/:id", productController.getProductById);
router.post("/", productController.insert);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", productController.editProduct);

module.exports = router;
