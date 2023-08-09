const express = require("express");
const router = express.Router();
const stockMutation = require("../controllers").stockMutationControllers;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", checkRole.checkWAdmin, stockMutation.getMutation);

router.get(
	"/mutation/request",
	checkRole.checkWAdmin,
	stockMutation.getMutationRequest
);

router.post("/", checkRole.checkWAdmin, stockMutation.requestMutation);

router.patch(
	"/mutation/handle/:id",
	checkRole.checkWAdmin,
	stockMutation.confirmMutation
);

router.patch("/:id", checkRole.checkWAdmin, stockMutation.editMutation);

router.delete("/:id", checkRole.checkWAdmin, stockMutation.cancelMutation);

module.exports = router;
