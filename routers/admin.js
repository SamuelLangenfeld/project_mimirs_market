var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models/mongoose");
var Order = mongoose.model("Order");
var UnitSale = mongoose.model("UnitSale");


router.get('/analytics', async function(req, res) {
  try {
    let stateRevenues = await Order.aggregate([
      { $group: { _id: '$state', revenue: { $sum: '$revenue' } } },
      { $sort: { _id: 1 } }
    ]);

    let totalRevenue = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: '$revenue' } } }
    ]);
    totalRevenue = totalRevenue[0];

    let categoryRevenues = await UnitSale.aggregate([
      { $group: { _id: '$category', revenue: { $sum: '$price' } } },
      { $sort: { _id: 1 } }
    ]);

    let productRevenues = await UnitSale.aggregate([
      { $group: { _id: '$name', revenue: { $sum: '$price' } } },
      { $sort: { _id: 1 } }
    ]);

    let totalUnits = await UnitSale.count();
    let totalTransactions = await Order.count();

    let totalCustomers = await Order.aggregate([{
      $group: { _id: '$email', count: { $sum: 1 } }
    }]);
    totalCustomers = totalCustomers.length;

    res.render('admin/analytics', {
      stateRevenues,
      totalRevenue,
      categoryRevenues,
      productRevenues,
      totalUnits,
      totalTransactions,
      totalCustomers
    });
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
});


router.get('/:orderId', async function(req, res) {
  try {
    let order = await Order.findById(req.params.orderId);
    res.render('admin/orderShow', { order });
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
});



router.get('/', async function(req, res) {
  try {
    let orders = await Order.find().limit(10);
    res.render('admin/ordersIndex', { orders });
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
});

module.exports = router;

/*

router.get('/', async function(req, res) {
  let cart = req.session.cart;
  console.log(req.sesio)
  let total = req.session.total;
  res.render('cart', { cart, total });
});

*/