import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      //validando os dados
      schema.validateSync(req.body, { abortEarly: false }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.message });
    }

    const { name, price, category_id, offer } = req.body;

    const { path: imageUrl } = req.file;

    try {
    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: imageUrl,
      offer
    });

    return res.status(201).json(newProduct);
  } catch (err) {
    console.log('MESSAGE:', err.message);
    console.log('ORIGINAL:', err.original);
    return res.status(400).json({ error: err.message });
  }

  }


  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      //validando os dados
      schema.validateSync(req.body, { abortEarly: false }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.message });
    }

    const { name, price, category_id, offer } = req.body;
    const { id }  = req.params;

    let path //esse bloco ta dizendo que se o req.file existir, então ele vai pegar a URL do req.file e atribuir a variável path, caso contrário, path vai ser undefined. Isso é útil para quando a gente quer atualizar um produto e não quer mudar a imagem dele, então a gente não passa o arquivo no req.file e o path vai continuar sendo undefined.
    if (req.file){
      path = req.file.path;
    }

    try {
    await Product.update({
      name,
      price,
      category_id,
      path,
      offer
    }, {
      where: {
        id
      }
    });

    return res.status(201).json();
  } catch (err) {
    console.log('MESSAGE:', err.message);
    console.log('ORIGINAL:', err.original);
    return res.status(400).json({ error: err.message });
  }

  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const deletedCount = await Product.destroy({
        where: {
          id,
        },
      });

      if (!deletedCount) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      return res.status(200).json({ message: 'Produto excluído com sucesso!' });
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
