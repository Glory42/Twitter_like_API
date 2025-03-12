const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const harsedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id',
            [username, email, harsedPassword]
        );

        const token = jwt.sign(
            { id: rows[0].id, email: email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' });
        res.status(201).json({ token });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Email already registered' });
        }
        console.log(err.message);
        res.status(500).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE email= $1',
            [email]
        );

        const user = rows[0];
        if (!user) return res.stasus(401).json({ error: 'Invalid email or password' });

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) return res.stasus(401).json({ error: 'Invalid email or password' });

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.stasus(500).json({ error: 'Login failed' });
    }
};

module.exports = {
    register,
    login
};