// routes/bookRoutes.js
import express from 'express';
import BookController from '../controllers/BookController.js';

const router = express.Router();
const bookController = new BookController();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cria um novo livro
 *     description: Cria um livro no banco de dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro ao criar livro
 */
router.post('/books', bookController.create);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     description: Atualiza as informações de um livro com o ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar livro
 */
router.put('/books/:id', bookController.updateBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retorna todos os livros
 *     description: Lista todos os livros armazenados no banco de dados
 *     responses:
 *       200:
 *         description: Lista de livros
 *       500:
 *         description: Erro ao listar livros
 */
router.get('/books', bookController.index);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retorna um livro específico
 *     description: Retorna as informações de um livro baseado no ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 */
router.get('/books/:id', bookController.show);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Exclui um livro
 *     description: Remove o livro com o ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro excluído com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/books/:id', bookController.deleteBook);

export default router;
