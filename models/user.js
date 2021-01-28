'use strict';
const bcrypt = require('bcrypt')

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
      models.user.hasMany(models.myCharacter)
      models.user.hasMany(models.goal)
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address format."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 99],
          msg: "Password must be between 8 and 99 characters long."
        }
      }
    },
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
    let hashedPassword = bcrypt.hashSync(pendingUser.password, 10) // Adding 10 salt rounds.
    pendingUser.password = hashedPassword
  })

  // 'prototype' means we add this function to the user class instead of a specific user.
  // Putting async in front of function says that somewhere in our fxn, we're going to tell it to pause, or 'await' for results of the following code before continuing
  user.prototype.validPassword = async function(passwordInput) { // Have to use function declaration instead of arrow function, because otherwise the 'this' binding works differently.
    let match = await bcrypt.compare(passwordInput, this.password) // 'this' refers to user in user.prototype, and is the hashed version since user.password was reassigned.
    console.log(`🐶??? Was the password a match? True or false: ${match}`)
    return match
  }

  return user;
};