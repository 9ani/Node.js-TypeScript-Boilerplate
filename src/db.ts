import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/lecture1');
        console.log('MongoDB connected...');
    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to connect to MongoDB:', err.message);
        } else {
            console.error('An unknown error occurred while connecting to MongoDB');
        }
        process.exit(1);
    }
};

export default connectDB;
