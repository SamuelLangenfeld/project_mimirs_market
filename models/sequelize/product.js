'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    sku: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};