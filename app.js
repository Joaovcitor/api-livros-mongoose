import express from 'express';
import mongoose from 'mongoose';
import cookieParse from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// importação de rotas

import booksRoutes from './src/routes/booksRoutes.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Livros',
      version: '1.0.0',
      description: 'Esta é a API para gerenciamento de livros',
    },
  },
  apis: ['./src/routes/booksRoutes.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.dbURI = process.env.MONGO_URI;
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParse());
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
  }

  async connectDataBase() {
    try {
      await mongoose.connect(this.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conexão bem sucedida!');
    } catch (e) {
      console.log('Ocorreu um erro ao se conectar ao banco de dados: ', e);
    }
  }

  configureRoutes() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    this.app.use('/books', booksRoutes);
  }

  start() {
    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDataBase();

    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
