import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';

const routes = new Router();

// MÉTODOS HTTP

//CRIANDO USUARIO
routes.post('/users', UserController.store);

//fazendo login
routes.post('/session', SessionController.store)

//criando produto
routes.post('/create-products', ProductController.store)



export default routes;
