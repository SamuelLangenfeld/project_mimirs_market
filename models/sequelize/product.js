"use strict";
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    sku: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, isInt: true }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { notEmpty: true, isNumeric: true }
    },
    image: DataTypes.STRING
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId"
    });
  };

  return Product;
};
