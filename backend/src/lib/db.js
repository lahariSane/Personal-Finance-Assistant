import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });
};
