'use strict';

var faker = require("faker");
var models = require("../../models/sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var categoryids = [];
    for (let i = 0; i < 5; i++) {
      categoryids.push({
        name: faker.commerce.department(),
      });
    }
    return queryInterface.bulkInsert("CategoryIds", categoryids);
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("CategoryIds", null, {}, models.CategoryId);
  }
};