import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      //validando os dados
      schema.validateSync(req.body, { abortEarly: false }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name } = req.body;
    const { path: imageUrl } = req.file;

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists.' });
    }

    try {
      const newCategory = await Category.create({
        name,
        path: imageUrl,
      });

      return res.status(201).json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    // editando produto
    const schema = Yup.object({
      name: Yup.string(),
      path: Yup.string(),
    });

    try {
      //validando os dados
      schema.validateSync(req.body, { abortEarly: false }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const { name } = req.body;
    const { id } = req.params;

    let path;
    if (req.file) {
      path = req.file.path;
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists.' });
    }

    try {
      await Category.update(
        {
          name,
          path,
        },
        {
          where: {
            id,
          },
        },
      );

      return res.status(201).json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(_req, res) {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  }
}

export default new CategoryController();
