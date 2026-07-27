import User from '../models/User.js';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import bcrypt from 'bcrypt'

class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true }); //validando o body com as informações certas do jeito que a model está esperando.
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }


    //validação de email duplicado
    const { name, email, password, admin } = req.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    //criptografia na senha do user
    const password_hash = await bcrypt.hash(password, 10)

    await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return res.status(201).json({ message: 'Welcome!' });
  }
}

export default new UserController();

/**
 * store -> cria dado
 * index -> lista todos os dados
 * show -> lista um dado
 * update -> atualiza dados
 * delete -> remove dados
 *
 */
