import User from '../models/User.js';
import { v4 } from 'uuid';
import * as Yup from 'yup'

class UserController {
  async store(req, res) {
    const schema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password_hash: Yup.string().min(6).required(),
        admin: Yup.boolean()
    })

    try{
        schema.validateSync(req.body, { abortEarly: false, strict: true}) //validando o body com as informações certas do jeito que a model está esperando.
    }
    catch(err){
        return res.status(400).json({ error: err.errors})
    }
    

   const { name, email, password_hash, admin } = req.body

   //validação de email duplicado
   const existingUser = await User.findOne({
    where: {
        email
    }
   })

   if(existingUser){
    return res.status(400).json({ message: "Email already exists."})
   }

   const user = await User.create({
        id: v4(),
        name,
        email, 
        password_hash, 
        admin
    });

   return res.status(201).json({ message: "Welcome! "});
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