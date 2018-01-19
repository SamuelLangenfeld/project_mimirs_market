var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./../models/mongoose");
var Order = mongoose.model("Order");
var UnitSale = mongoose.model("UnitSale");

router.get("/analytics", async (req, res) => {
  try {
    let analyticsInfo = [];

    analyticsInfo.push(
      Order.aggregate(
        { $group: { _id: "$state", revenue: { $sum: "$revenue" } } },
        { $sort: { _id: 1 } }
      )
    );
    analyticsInfo.push(
      Order.aggregate([
        { $group: { _id: null, revenue: { $sum: "$revenue" } } }
      ])
    );
    analyticsInfo.push(
      UnitSale.aggregate([
        { $group: { _id: "$category", revenue: { $sum: "$price" } } },
        { $sort: { _id: 1 } }
      ])
    );
    analyticsInfo.push(
      UnitSale.aggregate([
        { $group: { _id: "$name", revenue: { $sum: "$price" } } },
        { $sort: { _id: 1 } }
      ])
    );
    analyticsInfo.push(UnitSale.count());
    analyticsInfo.push(Order.count());
    analyticsInfo.push(
      Order.aggregate([
        {
          $group: { _id: "$email" }
        }
      ])
    );
    analyticsInfo.push(
      UnitSale.aggregate([
        {
          $group: { _id: "$name" }
        }
      ])
    );
    analyticsInfo.push(
      UnitSale.aggregate([
        {
          $group: { _id: "$category" }
        }
      ])
    );
    analyticsInfo.push(
      Order.aggregate([
        {
          $group: { _id: "$state" }
        }
      ])
    );

    analyticsInfo = await Promise.all(analyticsInfo);

    let stateRevenues = analyticsInfo[0];
    let totalRevenue = analyticsInfo[1][0];
    let categoryRevenues = analyticsInfo[2];
    let productRevenues = analyticsInfo[3];
    let totalUnits = analyticsInfo[4];
    let totalTransactions = analyticsInfo[5];
    let totalCustomers = analyticsInfo[6].length;
    let totalProducts = analyticsInfo[7].length;
    let totalCategories = analyticsInfo[8].length;
    let totalStatesSoldTo = analyticsInfo[9].length;

    res.render("admin/analytics", {
      stateRevenues,
      totalRevenue,
      categoryRevenues,
      productRevenues,
      totalUnits,
      totalTransactions,
      totalCustomers,
      totalProducts,
      totalCategories,
      totalStatesSoldTo
    });
  } catch (e) {
    console.error(e);
    res.redirect("/");
  }
});

router.get("/:orderId", async function(req, res) {
  try {
    let order = await Order.findById(req.params.orderId);
    res.render("admin/orderShow", { order });
  } catch (e) {
    console.error(e);
    res.redirect("/");
  }
});

router.get("/", async function(req, res) {
  try {
    let orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(20);
    res.render("admin/ordersIndex", { orders });
  } catch (e) {
    console.error(e);
    res.redirect("/");
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
