'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.myCharacter.belongsTo(models.user)
      models.myCharacter.belongsTo(models.stockCharacter)
      models.myCharacter.hasMany(models.goal)
    }
  };
  myCharacter.init({
    name: DataTypes.STRING,
    vision: DataTypes.STRING,
    rarity: DataTypes.INTEGER,
    weapon: DataTypes.STRING,
    level: DataTypes.INTEGER,
    maxLevel: DataTypes.INTEGER,
    aaLevel: DataTypes.INTEGER,
    eLevel: DataTypes.INTEGER,
    qLevel: DataTypes.INTEGER,
    maxTalentLevel: DataTypes.INTEGER,
    constellation: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER,
    stockCharacterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'myCharacter',
  });
  return myCharacter;
};