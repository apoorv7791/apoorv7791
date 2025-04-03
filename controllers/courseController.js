import courseModel from "../models/courseModel";
import express from "express";

const router = express.Router();

// Get all courses
router.get("/", async (_req, res) => {
    try {
        const courses = await courseModel.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new course
router.post("/", async (req, res) => {
    const course = new courseModel({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a course by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedCourse = await courseModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a course by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedCourse = await courseModel.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;