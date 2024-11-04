// models/Team.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Team = sequelize.define('Team', {
    teamId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Team;
