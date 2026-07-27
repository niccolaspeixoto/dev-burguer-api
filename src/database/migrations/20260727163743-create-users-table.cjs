'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //metodo para subir a tabela no db
    await queryInterface.createTable('users', { 
      id: {
        primaryKey: true, // identificador unico
        allowNull: false, // nao permite que o campo seja nulo
        type:Sequelize.UUID, // codigo do ID
        defaultValue: Sequelize.UUIDV4 // o banco irá gerar o id
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // o email será unico
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
   
  },

  async down (queryInterface) { //metodo para derrubar essa tabela no db
    await queryInterface.dropTable('users');
  }
};
