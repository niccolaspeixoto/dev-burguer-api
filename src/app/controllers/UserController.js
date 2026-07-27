/**
 * store -> cria dado
 * index -> lista todos os dados
 * show -> lista um dado
 * update -> atualiza dados
 * delete -> remove dados
 *
 */

import User from '../models/User.js';
import { v4 } from 'uuid';

class UserController {
  async store(req, res) {
   const { name, email, password_hash, admin } = req.body

   const existingUser = await User.findOne({
    where: {
        email
    }
   })

   if(existingUser){
    return res.status(400).json({ message: "Esse email já está cadastrado."})
   }

   const user = await User.create({
        id: v4(),
        name,
        email, 
        password_hash, 
        admin
    });

   return res.status(201).json({ message: "Usuário cadastrado com sucesso! Seja bem-vindo!"});
  }
}


export default new UserController();
