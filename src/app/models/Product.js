import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) { // esse bloco serve para dizer a model que ela tem uma relação com a model Category, e que a chave estrangeira é category_id
    this.belongsTo(models.Category, { 
      foreignKey: 'category_id',
      as: 'category', // esse as é o nome que vamos dar para a relação, ou seja, quando formos buscar um produto, vamos poder buscar a categoria dele através do nome category
     });
  }
}

export default Product;
