'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // patientId: DataTypes.INTEGER,
    // doctorId: DataTypes.INTEGER,
    // date: DataTypes.DATE,
    // timeType: DataTypes.STRING,
    // statusId: DataTypes.STRING,
    await queryInterface.createTable('booking', {
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
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      timeType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statusId: {
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