import Subject from "../models/subjectModel.js"

// Get all subjects
export const getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find()
        res.status(200).json(subjects)
    } catch (error) {
        next(error)
    }
}

// Get a single subject by ID
export const getSubjectById = async (req, res, next) => {
    try {
        const subject = await Subject.findById(req.params.id)
        if (!subject) return res.status(404).json({ message: "Subject not found" })
        res.status(200).json(subject)
    } catch (error) {
        next(error)
    }
}

// Create a new subject
export const createSubject = async (req, res, next) => {
    try {
        const { name, description } = req.body
        if (!name) return res.status(400).json({ message: "Name is required" })

        const newSubject = await Subject.create({ name, description })
        res.status(201).json(newSubject)
    } catch (error) {
        next(error)
    }
}

// Update a subject by ID
export const updateSubject = async (req, res, next) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedSubject) return res.status(404).json({ message: "Subject not found" })

        res.status(200).json(updatedSubject)
    } catch (error) {
        next(error)
    }
}

// Delete a subject by ID
export const deleteSubject = async (req, res, next) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id)
        if (!deletedSubject) return res.status(404).json({ message: "Subject not found" })

        res.status(200).json({ message: "Subject deleted successfully" })
    } catch (error) {
        next(error)
    }
}

