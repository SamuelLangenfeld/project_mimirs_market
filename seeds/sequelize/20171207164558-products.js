'use strict';
var faker = require('faker');
var models = require('../../models/sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {

  var users = [];
  for (let i = 0; i < 20; i++) {
    products.push({
      name: faker.commerce.productName(),
      sku: faker.random.number(),
      price: faker.commerce.price(),
      email: faker.internet.email()
    });
  }
  return queryInterface.bulkInsert('Products', products);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Products', null, {}, models.Product)
  }
};
