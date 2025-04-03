// backend/routes/signupRoutes.js
import express from 'express';
import { validateSignup } from '../middlewares/signupauth';
import { User } from '../models/userModel';

const router = express.Router();

router.post('/signup', validateSignup, async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;