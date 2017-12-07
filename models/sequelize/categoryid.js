'use strict';
module.exports = (sequelize, DataTypes) => {
  var CategoryId = sequelize.define('CategoryId', {
    name: DataTypes.STRING
  });

  CategoryId.associate = function(models) {
    CategoryId.hasMany(models.Product, {
      foreignKey: "categoryId"
    });
  };

  return CategoryId;
};