// pages/api/signup.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../../models/Employee');

export default async (req, res) => {
    if (req.method === 'POST') {
        const { name, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const employee = await Employee.create({ name, username, password: hashedPassword });
            res.status(201).json({ message: 'User created successfully', employee });
        } catch (error) {
            res.status(500).json({ error: 'User registration failed' });
        }
    }
};
