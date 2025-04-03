import User from '../models/userModel.js';
import Course from '../models/courseModel.js';

// Enroll a user in a course
export const enrollUserInCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Validate input
        if (!userId || !courseId) {
            return res.status(400).json({ message: "User ID and Course ID are required" });
        }

        // Find user and course
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if user is already enrolled
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: "User is already enrolled in this course" });
        }

        // Add course to user's enrolledCourses
        user.enrolledCourses.push(courseId);
        await user.save();

        // Add user to course's enrolledUsers
        course.enrolledUsers.push(userId);
        await course.save();

        res.status(200).json({
            message: "Enrollment successful",
            user: {
                id: user._id,
                name: user.name,
                enrolledCourses: user.enrolledCourses
            },
            course: {
                id: course._id,
                title: course.title,
                enrolledUsers: course.enrolledUsers
            }
        });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ message: "Error enrolling user in course", error: error.message });
    }
};

// Get enrolled courses for a user
export const getUserEnrolledCourses = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('enrolledCourses');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            userId: user._id,
            name: user.name,
            enrolledCourses: user.enrolledCourses
        });
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: "Error fetching enrolled courses", error: error.message });
    }
};

// Get enrolled users for a course
export const getCourseEnrolledUsers = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate('enrolledUsers');

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            courseId: course._id,
            title: course.title,
            enrolledUsers: course.enrolledUsers
        });
    } catch (error) {
        console.error('Error fetching enrolled users:', error);
        res.status(500).json({ message: "Error fetching enrolled users", error: error.message });
    }
}; 