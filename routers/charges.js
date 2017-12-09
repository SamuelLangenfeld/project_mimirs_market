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
var stripe = require('stripe')(STRIPE_SK);


router.post('/', async function(req, res) {

  //Here I need to take the info from req.session.cart
  //Plus whatever info I grabbed from the checkout form
  //All of this should be in req.session.cart and req.session.checkoutData
  //Only thing I need from stripe is the stripeToken

  let charge = req.body;
  try {
    charge = await stripe.charges.create({
      amount: 2020,
      currency: 'usd',
      description: "Maybe it happened",
      source: charge.stripeToken
    })
  } catch (e) {
    console.log("Attempted Stripe charge did not work");
    console.error(e);
    res.redirect('/');
  }
  console.log(charge);
  let keys = Object.keys(charge);
  keys.forEach(key => {
    console.log(`CHARGE KEY ${charge}`);
  });
  res.redirect('/products');
});

module.exports = router;