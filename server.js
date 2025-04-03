import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

// configuration
dotenv.config();

// creating a new express app
const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// database connection
connectDB();

// Setting up the port for the server
const PORT = process.env.PORT || 5000;


// Setting up the route for the server
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.get("/", (_req, res) => {
    res.send({ message: 'Server is ready' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});