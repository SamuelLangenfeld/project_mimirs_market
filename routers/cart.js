var express = require('express');
var router = express.Router();
var models = require('../models/sequelize');
var Product = models.Product;
var CategoryId = models.CategoryId;
var sequelize = models.sequelize;

router.get('/', async function(req, res) {
  let cart = req.session.cart;
  console.log(req.sesio)
  let total = req.session.total;
  res.render('cart', { cart, total });
});

router.delete('/', async function(req, res) {
  req.session.cart = [];
  req.session.total = 0;
  let total = req.session.total
  let cart = req.session.cart;
  res.render('cart', { cart, total });
});

router.put('/', async function(req, res) {
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
  })
  if (newQuantity == 0) {
    cart.splice(index, 1);
  } else {
    targetProduct["quantity"] = newQuantity;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  })
  req.session.total = total;

  res.render('cart', { cart, total });
});
router.post('/', async function(req, res) {
  try {
    let product = await Product.findById(req.body.productId, { include: [{ model: CategoryId }] });
    let cart = req.session.cart;
    cart.forEach(cartItem => {
      if (product.id == cartItem.id) {
        res.render('cart', { cart });
        next();
      }
    });
    cart.push({ id: product.id, price: product.price, quantity: 1, name: product.name, description: product.description, sku: product.sku });
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    })
    req.session.total = total;
    res.render('cart', { cart, total });
  } catch (e) {
    next();
  }
});

module.exports = router;