import { check, validationResult } from 'express-validator';

export const validateSubject = [
    check('name').isLength({ min: 3 }).withMessage('Subject name must be at least 3 characters long'),
    check('description').isLength({ min: 10 }).withMessage('Subject description must be at least 10 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateSubject;