module.exports = {
    dialect: 'postgres', // dizendo ao sequelize qual tipo de banco ele vai lidar
    host: 'localhost', // dizendo ao Sequelize onde o banco está rodando
    username: 'admin', // nome do usuario
    password: '1234',// senha do admin
    database: 'dev-burguer-postgres-new', // nome do banco de dados
    define: {
        timeStamps: true, // conseguimos trackear a data de inserção/criação/atualização do usuario
        underScored: true,
        underScoredall: true
    }
}