const adminMiddleware = (req, res, next) => {
  const isUseradmin = req.userIsAdmin; //se userIsAdmin = true, ele faz login

  if(!isUseradmin){
    return res.status(401).json() // se o usuario que estiver tentando fazer login não tiver o token(nao for admin), ele recusa.
  }

  return next() // passa para o próximo middleware da rota, ou vai direto para o console.
};

export default adminMiddleware;
