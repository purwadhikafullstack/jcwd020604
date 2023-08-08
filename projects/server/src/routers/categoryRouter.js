const express = require("express");
const router = express.Router();
const categoryController = require("../controllers").categoryController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", checkRole.checkUser, categoryController.getCategory);
router.get("/:id", checkRole.checkUser, categoryController.getCategoryById);
router.post("/", checkRole.checkAdmin, categoryController.insertCategory);
router.patch("/:id", checkRole.checkAdmin, categoryController.editCategory);
router.delete("/:id", checkRole.checkAdmin, categoryController.deleteCategory);

module.exports = router;
