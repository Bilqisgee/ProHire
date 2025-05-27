import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('MONGO_URI is not defined in environment variables');
        throw new Error('MONGO_URI is not defined');
    }
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};