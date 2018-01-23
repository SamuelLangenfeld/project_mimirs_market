"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      sku: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true, isInt: true }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: { notEmpty: true, isInt: true }
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: { notEmpty: true, isNumeric: true }
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  }
};
