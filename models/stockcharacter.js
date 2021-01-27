'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stockCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.stockCharacter.hasMany(models.myCharacter)
    }
  };
  stockCharacter.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    rarity: DataTypes.INTEGER,
    vision: DataTypes.STRING,
    weapon: DataTypes.STRING,
    region: DataTypes.STRING,
    ascStat: DataTypes.STRING,
    headUrl: DataTypes.TEXT,
    portraitUrl: DataTypes.TEXT,
    wishUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'stockCharacter',
  });
  return stockCharacter;
};