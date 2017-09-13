const Sequelize = require('sequelize');

const db = require('../_db');
// OB/CJP: watch out, Category model might not exist (ordering bug)
const Category = db.models.category;
const Flavor = db.models.flavor;

// OB/CJP: distant future, consider validations on these fields
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
  // OB/CJP: remove undead code from master, bury it!
  // validate: {
  //   hasCategories() {
  //     // get the categories asynch
  //     if (this.getCategories().length===0) throw new Error('Require at least one category per item')
  //   }
  // },
  defaultScope: {
    // OB/CJP: can instead use `'category'`
    include: [{ model: Category}, {model: Flavor }]
  }
});

module.exports = Product;
