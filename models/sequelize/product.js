'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    sku: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    categoryId: DataTypes.STRING,
    image: DataTypes.STRING
  });

  Product.associate = function(models) {
    Product.belongsTo(models.CategoryId, {
      foreignKey: "categoryId"
    });
  };

  return Product;
};