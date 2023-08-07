const express = require("express");
const router = express.Router();
const stockMutation = require("../controllers").stockMutationControllers;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", stockMutation.getMutation);

router.get("/mutation/request", stockMutation.getMutationRequest);

router.post("/", stockMutation.requestMutation);

router.patch("/:id", stockMutation.confirmMutation);

router.delete("/:id", stockMutation.cancelMutation);

module.exports = router;
