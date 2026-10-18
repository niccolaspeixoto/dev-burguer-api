import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middlewares/auth.js'
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './app/middlewares/admin.js'
import OrderController from './app/controllers/OrderController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js'

const routes = new Router();

const upload = multer(multerConfig)

// MÉTODOS HTTP

//fazendo login
routes.post('/session', SessionController.store)

//USUARIOS
//CRIANDO USUARIO
routes.post('/users', UserController.store);

routes.use(authMiddleware) // dessa linha para baixo, só pode acessar as rotas os users admin.




//PRODUTO
//criando produto
routes.post('/create-products', adminMiddleware, upload.single('file') /* <- é um tipo de middleware, vem antes do controller */, ProductController.store)

//editando produto
routes.put('/update-products/:id', adminMiddleware, upload.single('file') /* <- é um tipo de middleware, vem antes do controller */, ProductController.update)

//buscando produtos
routes.get('/products', ProductController.index)

//excluindo produto
routes.delete('/delete-products/:id', adminMiddleware, ProductController.delete)


//CATEGORIA
//criando categoria
routes.post('/create-categories', adminMiddleware, upload.single('file'), CategoryController.store)

//editando categoria
routes.put('/update-categories/:id', adminMiddleware, upload.single('file'), CategoryController.update)

//buscando categorias
routes.get('/categories', CategoryController.index)

//PEDIDOS
//criando pedidos
routes.post('/create-orders', OrderController.store)

//editando pedidos
routes.put('/update-orders/:id', adminMiddleware, OrderController.update)

//buscando pedidos
routes.get('/orders', adminMiddleware, OrderController.index)


routes.post('/create-payment-intent', CreatePaymentIntentController.store)


export default routes;