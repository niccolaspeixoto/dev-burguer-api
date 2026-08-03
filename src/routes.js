import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './middlewares/admin.js'

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
routes.post('/create-products', adminMiddleware, upload.single('file') /* <- é um tipo de middleware, vem antes do controller */, ProductController.store)

//editando produto
routes.put('/update-products/:id', adminMiddleware, upload.single('file') /* <- é um tipo de middleware, vem antes do controller */, ProductController.update)

//buscando produtos
routes.get('/products', ProductController.index)


//CATEGORIA
//criando categoria
routes.post('/create-categories', adminMiddleware, upload.single('file'), CategoryController.store)

//editando categoria
routes.put('/update-categories/:id', adminMiddleware, upload.single('file'), CategoryController.update)

//buscando categorias
routes.get('/categories', CategoryController.index)


export default routes;