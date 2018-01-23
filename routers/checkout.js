const express = require("express");
const router = express.Router();
const models = require("../models/sequelize");
const mongooseModels = require("../models/mongoose");
const Order = mongooseModels.Order;
const Product = models.Product;
const State = models.State;
const sequelize = models.sequelize;
const UnitSale = mongooseModels.UnitSale;
const { STRIPE_SK, STRIPE_PK } = process.env;
const stripe = require("stripe")(STRIPE_PK);

router.get("/", async function(req, res) {
  let cart = req.session.cart;
  cart.forEach(product => {
    product["subTotal"] = product.price * product.quantity;
  });
  let total = req.session.total;
  let states = await State.findAll();

  res.render("checkout", { cart, total, states, STRIPE_PK });
});

router.post("/", async function(req, res) {
  let checkoutData = req.body;
  let order = {};
  order["email"] = checkoutData.email;
  order["fname"] = checkoutData.fname;
  order["lname"] = checkoutData.lname;
  order["revenue"] = checkoutData.revenue;
  order["stripeToken"] = checkoutData.stripeToken;
  order["street"] = checkoutData.street;
  order["city"] = checkoutData.city;
  order["state"] = checkoutData.state;
  try {
    let units = [];
    let items = req.session.cart;
    items.forEach(item => {
      item.category = item.Category.name;
      for (let i = 0; i < item.quantity; i++) {
        units.push(
          UnitSale.create({
            name: item.name,
            sku: item.sku,
            price: item.price,
            category: item.category
          })
        );
      }
    });

    await Promise.all(units);
    order["items"] = req.session.cart;
    order = await Order.create(order);
    await order.save();
    req.session.cart = [];
    req.session.total = 0;
    res.redirect("/admin");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
