'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.goal.belongsTo(models.user)
      models.goal.belongsTo(models.myCharacter)
    }
  };
  goal.init({
    li: DataTypes.TEXT,
    myCharacterId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'goal',
  });
  return goal;
};