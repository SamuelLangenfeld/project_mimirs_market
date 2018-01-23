"use strict";

var faker = require("faker");
var models = require("../../models/sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var categories = [];
    for (let i = 0; i < 5; i++) {
      let name = faker.commerce.department();
      while (categories.find(obj => name === obj.name)) {
        name = faker.commerce.department();
      }
      categories.push({
        name
      });
    }
    return queryInterface.bulkInsert("Categories", categories);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {}, models.Category);
  }
};
