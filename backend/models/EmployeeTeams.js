// models/EmployeeTeams.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Employee = require('./Employee');
const Team = require('./Team');

const EmployeeTeams = sequelize.define('EmployeeTeams', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeId: { type: DataTypes.INTEGER, references: { model: Employee, key: 'employeeId' } },
    teamId: { type: DataTypes.INTEGER, references: { model: Team, key: 'teamId' } },
});

Employee.belongsToMany(Team, { through: EmployeeTeams, foreignKey: 'employeeId' });
Team.belongsToMany(Employee, { through: EmployeeTeams, foreignKey: 'teamId' });

module.exports = EmployeeTeams;
