import { check, validationResult } from 'express-validator';

const validateCourse = [
    check('title')
        .isLength({ min: 5 })
        .withMessage('Course title must be at least 5 characters long'),
    check('description')
        .isLength({ min: 10 })
        .withMessage('Course description must be at least 10 characters long'),
    check('price')
        .isFloat({ gt: 0 })
        .withMessage('Course price must be a positive number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateCourse;
