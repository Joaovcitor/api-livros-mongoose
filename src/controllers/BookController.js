import Book from '../models/Books.js';
const book = new Book();

export default class BookController {
  async index(req, res) {
    try {
      const books = await book.index();
      return res.status(200).json({ books });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: 'Ocorreu um erro desconhecido ao buscar os livros!' });
    }
  }

  async show(req, res) {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ errors: 'Você precisa fornecer um ID do livro!' });
    }
    try {
      const bookInstance = new Book(req.body);
      const book = await bookInstance.show(req.params.id);
      res.status(200).json({ book });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: 'Ocorreu um erro desconhecido ao editar seu livro' });
    }
  }

  async create(req, res) {
    try {
      const bookInstance = new Book(req.body);
      await bookInstance.create(req.body);

      res.status(200).json({ message: 'Livro criado com sucesso!' });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: 'Ocorreu um erro desconhecido ao criar o livro!' });
    }
  }

  async updateBook(req, res) {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ errors: 'Você precisa fornecer um ID do livro!' });
    }
    try {
      const bookInstance = new Book(req.body);
      await bookInstance.update(req.params.id);
      res.status(200).json({ message: 'Livro editado com sucesso!' });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: 'Ocorreu um erro desconhecido ao editar seu livro' });
    }
  }

  async deleteBook(req, res) {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ errors: 'Você precisa fornecer um ID do livro!' });
    }
    try {
      const bookInstance = new Book(req.body);
      await bookInstance.delete(req.params.id);
      res.status(200).json({ message: 'Livro excluído com sucesso!' });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: 'Ocorreu um erro desconhecido ao editar seu livro' });
    }
  }
}
