const express = require("express");
const router = express.Router();

const { cartControllers } = require("../controllers");

router.get("/:user_id", cartControllers.getCartByUser);
router.post("/addCart", cartControllers.addCartByUser);
router.patch("/update/:id", cartControllers.editCartQty);
router.delete("/delete", cartControllers.deleteCartItem);

// router.delete("/carts/delete", cartControllers.deleteCartByUser);

module.exports = router;
