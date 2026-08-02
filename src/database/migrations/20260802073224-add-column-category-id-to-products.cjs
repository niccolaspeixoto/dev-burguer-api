'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category_id', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'categories', // se referindo a coluna de categorias
        key: 'id' // o id será a chave estrangeira. / Está sendo referenciado a coluna id da tabela categories
      },
      onUpdate: 'CASCADE', // se o id da categoria for alterado, o id da categoria do produto será alterado também
      onDelete: 'SET NULL', // se a categoria for deletada, o id da categoria do produto será setado como null
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('products', 'category_id');
  },
};
