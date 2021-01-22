'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      DataTypes.STRING,
      allowNull: false
    },
    email: {
      DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address format.'
        }
      }
    },
    password: DataTypes.STRING,
    UID: DataTypes.INTEGER,
    forumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });

// Convert email address to all lowercase to validate uniqueness, and also before we store it. 
user.addHook('beforeValidate', (pendingUser, options) => {
  pendingUser.email = pendingUser.email.toLowerCase()
})

// Hashing passwords after validating if they meet the minimum/maximum lengths.
user.addHook('beforeCreate', (pendingUser, options) => {
  
})


  return user;
};