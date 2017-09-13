const Sequelize = require('sequelize');
const db = require('../_db');

const Cart = db.define('cart', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Cart;
