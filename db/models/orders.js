const Sequelize = require('sequelize'); 

const db = require('../_db');

const Order = db.define('order', {
	// OB/CJP: unnecessary now (given orderProducts join table)
	price: {
		type: Sequelize.ARRAY(Sequelize.FLOAT), 
		allowNull: false
	}, 
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
}, {
	hooks: {
		beforeCreate: updateInventory
	}
}); 

// OB/CJP: dead code
function updateInventory() {
	//TODO
}; 

module.exports = Order; 