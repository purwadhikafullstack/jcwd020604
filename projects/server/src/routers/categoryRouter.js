const express = require("express");
const router = express.Router();
const categoryController = require("../controllers").categoryController;

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.insertCatategory);
router.patch("/:id", categoryController.editCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
