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

   const user = await User.create({
        id: v4(),
        name,
        email, 
        password_hash, 
        admin
    });

   return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    admin: user.admin
   });
  }
}


export default new UserController();
