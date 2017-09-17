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
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageName: {
    type: Sequelize.TEXT,
    defaultValue: 'default_product_image.png'
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  getterMethods: {
    price: function() {
      return parseFloat(this.getDataValue('price') / 100).toFixed(2)
    }
  },
  setterMethods: {
    price: function(value) {
      this.setDataValue('price', value * 100)
    }
  },
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
