'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stockCharacters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      rarity: {
        type: Sequelize.INTEGER
      },
      vision: {
        type: Sequelize.STRING
      },
      weapon: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      ascStat: {
        type: Sequelize.STRING
      },
      headUrl: {
        type: Sequelize.TEXT
      },
      portraitUrl: {
        type: Sequelize.TEXT
      },
      wishUrl: {
        type: Sequelize.TEXT
      },
      myCharacterId: {
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
    await queryInterface.dropTable('stockCharacters');
  }
};