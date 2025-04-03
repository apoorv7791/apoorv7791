import { Router } from 'express';
import mongoose from 'mongoose';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    loginUser
} from '../controllers/UserController.js';
import { validateUser } from '../middlewares/validateUser.js';

const router = Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    next();
}

// Login route
router.post('/login', loginUser);

// Get all users
router.get("/", getAllUsers);

// Get a single user by ID
router.get("/:id", validateObjectId, getUserById);

// Create a new user
router.post("/", validateUser, createUser);

// Update a user by ID
router.put("/:id", validateObjectId, validateUser, updateUserById);

// Delete a user by ID
router.delete("/:id", validateObjectId, deleteUserById);

export default router;
