'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // patientId: DataTypes.INTEGER,
    // doctorId: DataTypes.INTEGER,
    // description: DataTypes.STRING,
    // files: DataTypes.STRING
    await queryInterface.createTable('history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      files: {
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