// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Employee_Management_Application', 'root', '110044', {
    host: 'localhost', // or your database host
    dialect: 'mysql',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
