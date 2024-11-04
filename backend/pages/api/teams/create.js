// pages/api/teams/create.js
const Team = require('../../../models/Team');
const EmployeeTeams = require('../../../models/EmployeeTeams');

export default async (req, res) => {
    if (req.method === 'POST') {
        const { name, employeeId } = req.body;
        const team = await Team.create({ name });
        await EmployeeTeams.create({ employeeId, teamId: team.teamId });
        res.status(201).json(team);
    }
};
