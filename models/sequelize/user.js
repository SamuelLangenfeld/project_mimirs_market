'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userName: DataTypes.,
    email: DataTypes.
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};