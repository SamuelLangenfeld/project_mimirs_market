const mongoose = require("mongoose");
const mongooseeder = require("mongooseeder");
const models = require("../../models/mongoose/index.js");
var faker = require('faker');

var env = process.env.NODE_ENV || "development";
var config = require("./../../config/mongoose.json")[env];

const mongodbUrl =
  process.env.NODE_ENV === "production" ?
  process.env[config.use_env_variable] :
  `mongodb://${config.host}/${config.database}`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: () => {
    // --------------------------------------
    // Create Past Orders
    // --------------------------------------

    let categories = [];
    for (let i = 0; i < 5; i++) {
      categories.push(faker.commerce.department());
    };

    let items = [];
    for (let i = 0; i < 20; i++) {
      let item = {};
      item["name"] = faker.commerce.productName();
      item["sku"] = Number(faker.random.number());
      item["price"] = Number(faker.commerce.price());
      item["category"] = categories[Math.floor((Math.random() * 5))];
      items.push(item);
    };

    //Now have 20 different items set up
    //Let's make a bunch of orders, let's say 30
    //In each loop, make an order, save each individual item to a UnitSale
    //then save the order, and all its info to the orders table
    //So two records added to the records array every loop

    var records = [];

    for (let i = 0; i < 20; i++) {
      //start with figuring out items ordered;
      //Outer Loop is where we make the order;

      let numItemTypes = Math.random() * 4 + 1;
      let order = { items: [] };
      let revenue = 0;
      for (let i = 0; i < numItemTypes; i++) {
        let item = {};
        Object.assign(item, items[Math.floor(Math.random() * 20)]);
        let quantity = Math.floor(Math.random() * 3 + 1);
        for (let n = 0; n < quantity; n++) {
          records.push(models.UnitSale.create(item));
        }
        //UnitSales for the item are complete
        //Now time to create the Order
        item["quantity"] = quantity;
        revenue += item["price"];
        order["items"].push(item);

      }
      //the order should have all of its items
      //now time to make rest of order
      order["email"] = faker.internet.email();
      order["fname"] = faker.name.firstName();
      order["lname"] = faker.name.lastName();
      order["revenue"] = revenue;
      order["stripeToken"] = "RANDO TOKEN";
      order["street"] = faker.address.streetAddress();
      order["city"] = faker.address.city()
      order["state"] = faker.address.stateAbbr();
      Object.keys(order).forEach(key => {})
      records.push(models.Order.create(order));

    };

    return Promise.all(records);
  }
});