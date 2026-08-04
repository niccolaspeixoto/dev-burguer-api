import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'

const authMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization //pega o token dentro de authorization

  if(!authToken){
    return res.status(401).json({error: 'Token not provided'}) // se o usuario que estiver tentando fazer login não tiver o token(nao for admin), ele recusa.
  }
  
  const token = authToken.split(' ')[1]; //pega o token separado, certinho

  try{
    jwt.verify(token, authConfig.secret, (error, decoded) =>{ // aqui ele verifica o token que está chegando, pega a secret da config, e pega um erro e o decoded(o token "decodado")
       
        if (error){ //se tiver algum erro, ele vai falar qual é
            throw Error()
        }
        
        req.userId = decoded.id// se nao tiver erro, cria um campo na requisição chamado: "userId", que receberá o valor do id que vem do token decodado.
        req.userName = decoded.name // cria um campo na requisição chamado: "userName", que receberá o valor do name que vem do token decodado.
        req.userIsAdmin = decoded.admin // cria um campo na requisição chamado: "userIsAdmin", que receberá o valor do admin que vem do token decodado.
    })
  }catch(_error){
    return res.status(401).json({error: 'Token is invalid'}) // me fala qual é o erro
  }

  return next() // passa para o próximo middleware da rota, ou vai direto para o console.
};

export default authMiddleware;
