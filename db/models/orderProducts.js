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
      return this.getDataValue('originalPrice') / 100
    }
  },
  setterMethods: {
    originalPrice: function(value) {
      this.setDataValue('originalPrice', value * 100)
    }
  }
});

module.exports = orderProducts;
