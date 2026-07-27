import { Router } from 'express';
import UserController from './app/controllers/UserController.js';

const routes = new Router();

// MÉTODOS HTTP

//CRIANDO USUARIO
routes.post('/users', UserController.store);

export default routes;
