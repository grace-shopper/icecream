const Sequelize = require('sequelize'); 

const db = require('../_db');

const orderProducts = db.define('order_products', {
	originalPrice: {
		type: Sequelize.FLOAT, // OB/CJP: integer instead of float, measure in cents
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER, 
		allowNull: false
	}
}); 

module.exports = orderProducts; 