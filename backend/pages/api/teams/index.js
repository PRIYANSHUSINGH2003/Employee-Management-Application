// pages/api/teams/index.js
const Team = require('../../../models/Team');

export default async (req, res) => {
    if (req.method === 'GET') {
        const teams = await Team.findAll();
        res.status(200).json(teams);
    }
};
