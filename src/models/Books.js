import mongoose from 'mongoose';
import { BookSchema } from '../schemas/BookSchema.js';

const BookModel = mongoose.model('Book', BookSchema);

export default class Book {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.book = null;
  }

  async create() {
    if (this.errors.length > 0) return;

    this.book = await BookModel.create(this.body);
  }

  async update(id) {
    if (typeof id !== 'string') return;
    this.book = await BookModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  async show(id) {
    if (typeof id !== 'string') return;
    const book = await BookModel.findById(id);
    return book;
  }

  async index() {
    const books = await BookModel.find();
    return books;
  }

  async delete() {
    if (typeof id !== 'string') return;
    const book = await BookModel.findOneAndDelete({ _id: id });
    return book;
  }
}
