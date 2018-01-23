var express = require("express");
var router = express.Router();
var models = require("../models/sequelize");
var Product = models.Product;
var Category = models.Category;

router.get("/", async function(req, res) {
  let cart = req.session.cart;
  let total = req.session.total;
  res.render("cart", { cart, total });
});

router.delete("/", async function(req, res) {
  req.session.cart = [];
  req.session.total = 0;
  let total = req.session.total;
  let cart = req.session.cart;
  res.render("cart", { cart, total });
});

router.put("/", async function(req, res) {
  let cart = req.session.cart;
  let productId = Number(req.body.productId);
  let index;
  let newQuantity = Number(req.body.quantity);
  let targetProduct;
  cart.forEach((product, i) => {
    if (product.id == productId) {
      index = i;
      targetProduct = product;
    }
  });
  if (newQuantity == 0) {
    cart.splice(index, 1);
  } else {
    targetProduct["quantity"] = newQuantity;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  req.session.total = total;

  res.render("cart", { cart, total });
});
router.post("/", async function(req, res) {
  try {
    let product = await Product.findById(req.body.productId, {
      include: [{ model: Category }]
    });
    let cart = req.session.cart;

    let newItem = true;
    cart.forEach(item => {
      if (item.id === product.id) {
        newItem = false;
      }
    });

    if (!newItem) {
      return res.render("cart", { cart, total: req.session.total });
    }

    cart.push({ ...product.dataValues, quantity: 1 });
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    req.session.total = total;
    res.render("cart", { cart, total });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
