const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../mockDB');

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        const existingUser = db.users.find(u => u.email === email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = {
            _id: Math.random().toString(36).substr(2, 9),
            fullName,
            email,
            password: hashedPassword
        };
        
        db.users.push(user);
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = db.users.find(u => u.email === email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        
        res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };
