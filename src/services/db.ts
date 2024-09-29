import mongoose from 'mongoose';
import { DATABASE_URL } from '../config';


export async function connectToDB() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}