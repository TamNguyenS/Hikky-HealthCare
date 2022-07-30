'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // userId: DataTypes.INTEGER,
    // specialtyId: DataTypes.INTEGER,
    // description: DataTypes.TEXT,
    // count: DataTypes.INTEGER,
    // addressClinic: DataTypes.TEXT,
    // note: DataTypes.STRING
    await queryInterface.createTable('doctor_info', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      specialtyId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      addressClinic: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        allowNull: false
      },
      positionIdote: {
        type: Sequelize.STRING,
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