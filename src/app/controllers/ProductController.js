import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
    });

    try {
      //validando os dados
      schema.validateSync(req.body, { abortEarly: false }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.message });
    }

    const { name, price, category_id } = req.body;

    const { filename } = req.file;

    try {
    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename
    });

    return res.status(201).json(newProduct);
  } catch (err) {
    console.log('MESSAGE:', err.message);
    console.log('ORIGINAL:', err.original);
    return res.status(400).json({ error: err.message });
  }

  }

  async index(_req, res){
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'] // aqui estamos dizendo que queremos apenas o id e o name da categoria, e não todos os campos da tabela category
      }
    })

    return res.status(200).json(products)
  }
}

export default new ProductController();
