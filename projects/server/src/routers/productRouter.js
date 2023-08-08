const express = require("express");
const router = express.Router();
const productController = require("../controllers").productController;
const { fileUploader, upload } = require("../middlewares/multer");

router.get("/", productController.getAll);
router.get("/getAllProduct/getAll", productController.getAllProduct);
// router.get("/id/:id", productController.getProductById);
router.get("/:uuid", productController.getProductByUuid);
router.post(
  "/",
  fileUploader({ destinationFolder: "productImg" }).array("productImg", 5),
  productController.insert
);
router.delete("/:id", productController.deleteProduct);
router.patch(
  "/:id",
  fileUploader({ destinationFolder: "productImg" }).array("productImg", 5),
  productController.editProduct
);

module.exports = router;
