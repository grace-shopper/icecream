const Sequelize = require('sequelize'); 

const db = require('../_db');

const Order = db.define('order', {
	purchasedAt: {
		type: Sequelize.DATE, 
		allowNull: false, 
		defaultValue: Sequelize.NOW
	},
	status: {
		type: Sequelize.TEXT, 
		allowNull: false, 
		defaultValue: "Created"
	}
}); 

module.exports = Order; 