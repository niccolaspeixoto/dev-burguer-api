import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';

const routes = new Router();

const upload = multer(multerConfig)

// MÉTODOS HTTP

//fazendo login
routes.post('/session', SessionController.store)

routes.use(authMiddleware) // dessa linha para baixo, só pode acessar as rotas os users admin.

//USUARIOS
//CRIANDO USUARIO
routes.post('/users', UserController.store);

//PRODUTO
//criando produto
routes.post('/create-products', upload.single('file') /* <- é um tipo de middleware, vem antes do controller */, ProductController.store)

//buscando produtos
routes.get('/products', ProductController.index)



export default routes;