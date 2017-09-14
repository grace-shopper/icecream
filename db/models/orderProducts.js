const Sequelize = require('sequelize');

const db = require('../_db');

const orderProducts = db.define('order_products', {
	originalPrice: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
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
  }
});

module.exports = orderProducts;
