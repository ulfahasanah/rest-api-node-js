'use strict';
const hash = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize
  class User extends Model {}

  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: true,
        notEmpty: true, 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: true,
        notEmpty: true, 
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
          const hashPass = hash.hashPassword(instance.password)
          instance.password = hashPass
        }
    },
    timestamps : true,
  });



  User.associate = function(models) {
    // associations can be defined here
  };
  return User;

};