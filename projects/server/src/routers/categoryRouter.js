const express = require("express");
const router = express.Router();
const categoryController = require("../controllers").categoryController;

router.get("/", categoryController.getCategory);
router.post("/", categoryController.insertCat);

module.exports = router;
