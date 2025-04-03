import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Instead of exiting, we'll retry the connection
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;