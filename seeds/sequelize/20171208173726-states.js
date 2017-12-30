'use strict';
var models = require("../../models/sequelize");


module.exports = {
  up: (queryInterface, Sequelize) => {

    let states = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA",
      "ID",
      "IL",
      "IN",
      "KS",
      "KY",
      "LA",
      "MA",
      "MD",
      "ME",
      "MI",
      "MN",
      "MO",
      "MS",
      "MT",
      "NC",
      "ND",
      "NE",
      "NH",
      "NJ",
      "NM",
      "NV",
      "NY",
      "OH",
      "OK",
      "OR",
      "PA",
      "PR",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VA",
      "VI",
      "VT",
      "WA",
      "WI",
      "WV",
      "WY"
    ];
    let statesArray = [];
    states.forEach(state => {
      statesArray.push({
        name: state,
        createdAt: (new Date()),
        updatedAt: (new Date())
      });
    });
    return queryInterface.bulkInsert("States", statesArray);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("States", null, {}, models.State);
  }
};