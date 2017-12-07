'use strict';

var faker = require('faker');
var models = require('../../models/sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var products = [];
    for (let i = 0; i < 20; i++) {
      products.push({
        name: "bob",
        sku: faker.random.number(),
        price: faker.commerce.price(),
        description: faker.commerce.product()
      });
    }
    return queryInterface.bulkInsert('Products', products);

  },

  down: (queryInterface, Sequelize) => {


    return queryInterface.bulkDelete('Products', null, {}, models.Product);

  }

};