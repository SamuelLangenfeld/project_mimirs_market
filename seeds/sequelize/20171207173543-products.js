"use strict";

var faker = require("faker");
var models = require("../../models/sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var products = [];
    for (let i = 0; i < 30; i++) {
      products.push({
        name: faker.commerce.productName(),
        sku: faker.random.number(),
        price: faker.commerce.price(),
        description: faker.commerce.product(),
        categoryId: Math.random() * 4 + 1,
        image: "http://via.placeholder.com/300x200"
      });
    }
    return queryInterface.bulkInsert("Products", products);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {}, models.Product);
  }
};
