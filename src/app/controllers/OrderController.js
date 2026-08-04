import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class OrderController {
  async store(req, res) {
    const schema = Yup.object({ // recebendo os dados da requisição
     products: Yup.array().required().of(
        Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
        })
     )
    });

    try {
      //validando os dados
      schema.validateSync(req.body, { abortEarly: false, strict: true }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.message });
    }

    const { userId, userName } = req; //pega o id e o nome do user que está fazendo o pedido.
    const { products } = req.body; // pega os produtos que estão chegando no body da requisição.

    const productsIds = products.map(product => product.id); //pega todos os ids dos produtos que estão chegando no body da requisição.

    const foundProducts = await Product.findAll({ //pega os produtos que estão no banco de dados, e compara com os ids que estão chegando no body da requisição.
        where: {
            id: productsIds
        },
        include: {
            model: Category,
            as: 'category',
            attributes: ['name']
        }
    })
    
    const mappedProducts = foundProducts.map(product => { // mapeia os produtos que estão no banco de dados, e compara com os produtos que estão chegando no body da requisição.
        const quantity = products.find(p => p.id === product.id).quantity; //pega a quantidade do produto que está chegando no body da requisição, e compara com o id do produto que está vindo do banco de dados.
        const newProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            url: product.url,
            category: product.category.name,
            quantity
        }
        return newProduct;
    })

   const order = { //formato que o schema espera para criar o pedido.
    user: {
        id: userId,
        name: userName
    },
    products: mappedProducts,
    status: "Pedido realizado com sucesso!"
    
   }

    return res.status(201).json(order);

  }

}

export default new OrderController();
