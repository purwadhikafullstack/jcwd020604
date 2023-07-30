const express = require("express");
const router = express.Router();
const categoryController = require("../controllers").categoryController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.getCategoryById);
router.post("/", checkRole.checkAdmin, categoryController.insertCategory);
router.patch("/:id", checkRole.checkAdmin, categoryController.editCategory);
router.delete("/:id", checkRole.checkAdmin, categoryController.deleteCategory);

module.exports = router;
