import { Router } from 'express';
import { enrollUserInCourse, getUserEnrolledCourses, getCourseEnrolledUsers } from '../controllers/enrollmentController.js';

const router = Router();

// Enroll a user in a course
router.post('/enroll', enrollUserInCourse);

// Get all courses enrolled by a user
router.get('/user/:userId/courses', getUserEnrolledCourses);

// Get all users enrolled in a course
router.get('/course/:courseId/users', getCourseEnrolledUsers);

export default router; 