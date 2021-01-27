'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testStockCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  testStockCharacter.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    rarity: DataTypes.INTEGER,
    vision: DataTypes.STRING,
    weapon: DataTypes.STRING,
    region: DataTypes.STRING,
    ascStat: DataTypes.STRING,
    headUrl: DataTypes.TEXT,
    portraitUrl: DataTypes.TEXT,
    wishUrl: DataTypes.TEXT,
    myCharacterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'testStockCharacter',
  });
  return testStockCharacter;
};