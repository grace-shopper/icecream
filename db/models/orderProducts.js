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
    originalPrice: function() {
      return parseFloat(this.getDataValue('originalPrice') / 100).toFixed(2)
    }
  },
  setterMethods: {
    originalPrice: function(value) {
      this.setDataValue('originalPrice', value * 100)
    }
  }
});

module.exports = orderProducts;
