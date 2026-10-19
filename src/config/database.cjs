module.exports = {
    dialect: 'postgres', // dizendo ao sequelize qual tipo de banco ele vai lidar
    host: process.env.DB_HOST || 'localhost', // dizendo ao Sequelize onde o banco está rodando
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'admin', // nome do usuario
    password: process.env.DB_PASS || '1234',// senha do admin
    database: process.env.DB_NAME || 'dev-burguer-postgres-new', // nome do banco de dados
    dialectOptions: process.env.DB_SSL === 'true' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false // necessário para bancos gerenciados como Neon/Supabase
        }
    } : {},
    define: {
        timeStamps: true, // conseguimos trackear a data de inserção/criação/atualização do usuario
        underScored: true,
        underScoredall: true
    }
}