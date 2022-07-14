'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // key: DataTypes.STRING,
    // type: DataTypes.STRING,
    // valueEn: DataTypes.STRING,
    // valuevn: DataTypes.STRING
    await queryInterface.createTable('all_code', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valueEn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valuevn: {
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