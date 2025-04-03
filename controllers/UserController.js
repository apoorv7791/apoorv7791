import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Create a new user
export async function createUser(req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get all users
export async function getAllUsers(req, res) {
    try {
        const users = await User.find();  // FIX: Call find() from User model
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a user by ID
export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id); // FIX: Call findById() on User
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a user by ID
export async function updateUserById(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // FIX: Call findByIdAndUpdate() on User
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete a user by ID
export async function deleteUserById(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // FIX: Call findByIdAndDelete() on User
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Login user
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
}
