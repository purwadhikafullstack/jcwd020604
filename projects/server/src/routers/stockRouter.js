const express = require("express");
const router = express.Router();
const stockController = require("../controllers").stockController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", checkRole.checkUser, stockController.getStock);

router.post("/", checkRole.checkWAdmin, stockController.addStock);

router.patch("/:id", checkRole.checkWAdmin, stockController.editStock);

router.delete("/:id", checkRole.checkAdmin, stockController.deleteStock);

module.exports = router;
