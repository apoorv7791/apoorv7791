import { Router } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { findOne } from '../models/User'; // Assuming you have a User model

const router = Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and send token
        const payload = { userId: user.id };
        const token = sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;