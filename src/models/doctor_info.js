'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Doctor_info.init({
        userId: DataTypes.STRING,
        specialtyId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        count: DataTypes.INTEGER,
        addressClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        positionId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Doctor_info',
    });
    return Doctor_info;
};