const express = require("express");
const router = express.Router();
const stockMutation = require("../controllers").stockMutationControllers;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", stockMutation.getStockMutation);
router.post("/", stockMutation.requestStockMutation);

module.exports = router;
