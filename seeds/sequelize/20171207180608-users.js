"use strict";
var faker = require("faker");
var models = require("../../models/sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email()
      });
    }
    return queryInterface.bulkInsert("Users", users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {}, models.User);
  }
};
