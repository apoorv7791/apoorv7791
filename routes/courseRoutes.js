import { Router } from 'express';
import Course from '../models/courseModel.js';
const router = Router();

// Get all courses
router.get('/', async (_req, res) => {
    try {
        const courses = await Course.find().populate('subject').populate('enrolledUsers');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single course
router.get('/:id', getCourse, (req, res) => {
    res.json(res.course);
});

// Create a new course
router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        subject: req.body.subject,
        enrolledUsers: req.body.enrolledUsers
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get a course by ID
async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id).populate('subject').populate('enrolledUsers');
        if (!course) {
            return res.status(404).json({ message: 'Cannot find course' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.course = course;
    next();
}

export default router;