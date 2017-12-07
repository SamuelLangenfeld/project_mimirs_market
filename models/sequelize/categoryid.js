'use strict';
module.exports = (sequelize, DataTypes) => {
  var CategoryId = sequelize.define('CategoryId', {
    name: DataTypes.STRING
  });
  return CategoryId;
};