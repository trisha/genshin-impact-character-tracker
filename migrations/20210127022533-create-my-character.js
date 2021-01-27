'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('myCharacters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      vision: {
        type: Sequelize.STRING
      },
      weapon: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      maxLevel: {
        type: Sequelize.INTEGER
      },
      aaLevel: {
        type: Sequelize.INTEGER
      },
      eLevel: {
        type: Sequelize.INTEGER
      },
      qLevel: {
        type: Sequelize.INTEGER
      },
      maxTalentLevel: {
        type: Sequelize.INTEGER
      },
      constellation: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      goalId: {
        type: Sequelize.INTEGER
      },
      stockCharacterId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('myCharacters');
  }
};