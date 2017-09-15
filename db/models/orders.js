const Sequelize = require('sequelize');

const db = require('../_db');
const Product = db.models.product;

const Order = db.define('order', {
	purchasedAt: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	status: {
		type: Sequelize.TEXT,
		defaultValue: "In Cart"
	}
}, {
	defaultScope: {
		include: [{ model: Product}]
	}
});

Order.prototype.getNumProducts = function(inst) {
	return inst.getProducts().length;
}

module.exports = Order;
