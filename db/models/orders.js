const Sequelize = require('sequelize');

const db = require('../_db');
const Product = db.models.product;

const Order = db.define('order', {
	purchasedAt: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW,
		get() {
			return this.getDataValue("purchasedAt").toLocaleString();
		}
	},
	status: {
		type: Sequelize.TEXT,
		allowNull: false,
		defaultValue: "In Cart"
	},
	quantity: {
		type: Sequelize.VIRTUAL,
		get() {
			const products = this.products;
			const qtyArr = products && products.map((product) => {
				return product.order_products.quantity
			})

			const total = qtyArr && qtyArr.reduce((acc, count) => {
				return acc + count
			}, 0);

			return total || 0
		}
	}
}, {
	defaultScope: {
    include: [{ model: Product}]
	}
});

module.exports = Order;
