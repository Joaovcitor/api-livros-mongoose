import mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  availableCopies: {
    type: Number,
    default: 1,
  },
});
