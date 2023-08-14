const { where } = require("sequelize");
const db = require("../models/");
const sequelize = require("../models");
const cart = require("../models/cart");
const stock = require("../models/stock");
const Cart = db.carts;
const User = db.users;
const Product = db.products;
const Stock = db.stocks;

const cartControllers = {
  getCartByUser: async (req, res) => {
    const { user_id } = req.params;
    try {
      const getCart = await db.carts.findAll({
        include: [
          { model: db.products, include: [{ model: db.product_images }] },
        ],
        where: { user_id },
      });
      res.status(200).send(getCart);
      // console.log(getCart);
    } catch (err) {
      console.log(err);
    }
  },
  addCartByUser: async (req, res) => {
    try {
      const { user_id, product_id, qty, price } = req.body; // declare input
      //flow function
      console.log(req.body.price);

      //check Product
      const checkProduct = await Cart.findOne({
        where: [{ product_id: product_id }, { user_id: user_id }],
      });

      //check user id dan product id
      const sumQty = await Cart.sum("qty", {
        where: [{ product_id: product_id }, { user_id: user_id }],
      });
      // console.log(sumQty);
      //check stock by product id
      const checkStock = await db.stocks.findOne({
        where: [{ product_id: product_id }],
      });
      // bandingkan qty dgn stock actual sesuai dgn product id yang sama
      if (sumQty + qty > checkStock.dataValues.qty) {
        // apabila qty melebihi dari stock actual maka muncul respon dibawah ini
        return res.status(400).json({
          message: "The purchase has reached the maximum limit!",
        });
      } else {
        //apabila  qty belum melebihi stock actual maka user dapat menambakan jumlah qty product
        if (checkProduct) {
          await Cart.update(
            {
              qty: checkProduct.dataValues.qty + qty,
              subtotal: checkProduct.dataValues.subtotal + qty * price,
            },
            { where: [{ product_id: product_id }, { user_id: user_id }] }
          );
          res.status(200).json({
            message: "Anda berhasil menambahkan product",
          });
        } else {
          await Cart.create({
            user_id: user_id,
            product_id: product_id,
            qty: qty,
            subtotal: qty * price,
            price: price,
          });
          res.status(200).json({
            message: "Anda berhasil menambahkan product",
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Maaf sudah melebihi batas stock",
      });
    }
  },
  deleteCartItem: async (req, res) => {
    const { user_id, id } = req.query;
    try {
      await Cart.destroy({
        where: {
          user_id,
          id,
        },
      });

      return res
        .status(200)
        .send({ message: "Cart item deleted successfully." });
    } catch (error) {
      console.log("Error deleting cart item:", error);
      return res.status(500).send(error.message);
    }
  },
  editCartQty: async (req, res) => {
    try {
      const { id } = req.params;
      const { product_id, qty } = req.body;
      console.log(id, product_id, qty);

      const checkStock = await db.stocks.sum("qty", {
        where: [{ product_id: product_id }],
      });

      // Cari cart berdasarkan cart_id
      const existingCart = await db.carts.findByPk(id);
      // Pastikan cart dengan cart_id yang diberikan ada di database
      if (!existingCart) {
        return res.status(404).json({
          message: "Cart not found.",
        });
      }
      if (qty > checkStock) {
        return res.status(400).json({
          message: "The requested quantity exceeds the available stock.",
        });
      }
      // Update jumlah (qty) di dalam cart dan perbarui subtotalnya4wh
      await db.carts.update(
        {
          qty: qty,
          subtotal: qty * existingCart.price,
        },
        { where: { id } }
      );

      res.status(200).json({
        message: "Cart quantity updated successfully.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "An error occurred while updating the cart quantity.",
      });
    }
  },
};

module.exports = cartControllers;
