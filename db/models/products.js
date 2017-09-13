const Sequelize = require('sequelize');

const db = require('../_db');
const Category = db.models.category;
const Flavor = db.models.flavor;

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  imageName: {
    type: Sequelize.TEXT,
    defaultValue: 'default_product_img.png'
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  // validate: {
  //   hasCategories() {
  //     // get the categories asynch
  //     if (this.getCategories().length===0) throw new Error('Require at least one category per item')
  //   }
  // },
  defaultScope: {
    include: [{ model: Category}, {model: Flavor }]
  }
});

module.exports = Product;
