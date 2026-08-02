'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //removendo a coluna category da tabela products
     await queryInterface.removeColumn('products', 'category');
    
  },

  async down (queryInterface, Sequelize) { //adicionando a coluna category na tabela products
     await queryInterface.addColumn('products', 'category', { type: Sequelize.STRING, allowNull: true });
    
  }
};
