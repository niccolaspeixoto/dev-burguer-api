'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // ele entenderá qual o numero colocar no id. Se é 1, 2 ou 3, e assim por diante.
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }, // não pode ter duas categorias com o mesmo nome
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categories');
  },
};
