const Sequelize = require('sequelize'); 

const db = require('../_db');

const orderProducts = db.define('order_products', {
	originalPrice: {
		type: Sequelize.FLOAT, 
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER, 
		allowNull: false
	}
}); 

module.exports = orderProducts; 