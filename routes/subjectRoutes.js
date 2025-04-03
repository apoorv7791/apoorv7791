import express from 'express';
import { Router } from 'express';
import mongoose from 'mongoose';
import { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } from '../controllers/SubjectController.js';
import validateSubject from '../middlewares/subjectauth.js';

const router = Router();

// middleware to parse the request body as JSON
router.use(express.json());


// middleware to handle the requests
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    next();
};
// Get all subjects
router.get("/", getAllSubjects);

// Get a single subject by ID
router.get("/:id", validateObjectId, getSubjectById);

// Create a new subject
router.post("/", validateSubject, createSubject);

// Update a subject by ID
router.put("/:id", validateObjectId, validateSubject, updateSubject);

// Delete a subject by ID
router.delete("/:id", validateObjectId, deleteSubject);

export default router;
