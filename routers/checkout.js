var express = require('express');
var router = express.Router();
var models = require('../models/sequelize');
var Product = models.Product;
var State = models.State;
var sequelize = models.sequelize;
var {
  STRIPE_SK,
  STRIPE_PK
} = process.env;
var stripe = require('stripe')(STRIPE_PK);


router.get('/', async function(req, res) {
  let cart = req.session.cart;
  cart.forEach(product => {
    product["subTotal"] = product.price * product.quantity;
  })
  let total = req.session.total;
  let states = await State.findAll();

  res.render('checkout', { cart, total, states, STRIPE_PK });
});

router.post('/', async function(req, res) {
  let checkoutData = req.body;
  req.session.checkoutData = checkoutData;
  res.render('charges');
})

module.exports = router;