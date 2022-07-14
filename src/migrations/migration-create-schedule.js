'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // currentNumber: DataTypes.INTEGER,
    // maxNumber: DataTypes.INTEGER,
    // date: DataTypes.DATE,
    // timeType: DataTypes.STRING,
    // doctorID: DataTypes.INTEGER,
    await queryInterface.createTable('schedule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      maxNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      timeType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      doctorID: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};