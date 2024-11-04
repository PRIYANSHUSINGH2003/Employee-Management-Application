// pages/api/signin.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../../models/Employee');

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const employee = await Employee.findOne({ where: { username } });
            if (!employee) return res.status(404).json({ error: 'User not found' });

            const isPasswordValid = await bcrypt.compare(password, employee.password);
            if (!isPasswordValid) return res.status(403).json({ error: 'Incorrect password' });

            const token = jwt.sign({ employeeId: employee.employeeId }, 'secret_key');
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Sign-in failed' });
        }
    }
};
