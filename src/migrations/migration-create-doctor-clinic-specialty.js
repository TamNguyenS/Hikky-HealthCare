'use strict';
module.exports = {
  // doctorId: DataTypes.INTEGER,
  // clinicId: DataTypes.INTEGER,
  // specialtyId: DataTypes.INTEGER,
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_clinic_specialty', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.STRING
      },
      clinicId: {
        type: Sequelize.STRING
      },
      specialtyId: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};