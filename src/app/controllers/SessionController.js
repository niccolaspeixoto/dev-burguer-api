import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const emailOrPasswordIncorrect = () => {
      // apresenta a mensagem de dados incorretos.
      return res.status(400).json({ message: 'Email or password incorrect.' });
    };

    const isValid = await schema.isValid(req.body, { strict: true });

    if (!isValid) {
      // valida se os dados estão do formato esperado
      return emailOrPasswordIncorrect();
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      // se nao tiver o email cadastrado no sistema, retorna mensagem de erro.
      return emailOrPasswordIncorrect();
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );
    if (!isPasswordCorrect) {
      // valida se a senha é igual ao do usuario no db.
      return emailOrPasswordIncorrect();
    }

    const token = jwt.sign({ id: existingUser.id }/* <-payload */, authConfig.secret,/*  <- secret/signature */ {expiresIn: authConfig.expiresIn,}); //data de inspiração

    return res.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
      token
    }); // se o usuario chegou até aqui, seja bem-vindo!
  }
}

export default new SessionController();
