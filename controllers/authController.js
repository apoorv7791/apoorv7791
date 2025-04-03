import { findOne, create } from '../models/User';
import { sign } from 'jsonwebtoken';

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already exists'
            });
        }

        // Create new user
        const user = await create({
            name,
            email,
            password
        });

        // Generate JWT token
        const token = sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            status: 'success',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Check if password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            status: 'success',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}