'use strict';
module.exports = (sequelize, DataTypes) => {
  var CategoryId = sequelize.define('CategoryId', {
    name: DataTypes.
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CategoryId;
};