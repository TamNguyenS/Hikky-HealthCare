// const { Sequelize } = require('sequelize');
import Sequelize from 'sequelize';
import 'dotenv/config'
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('heathcare', 'root', 'nguyenchitam123', {
    host: '127.0.0.1',
    dialect: 'mysql',
});
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
}

export default connectDB;