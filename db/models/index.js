const User = require('./users.js'); 
const Order = require('./orders.js'); 
const Product = require('./products');
const Category = require('./category');
const Sequelize = require('sequelize'); 
const db = require('../_db');

const OrderProducts = db.define('order_products', {
	originalPrice: {
		type: Sequelize.FLOAT, 
		allowNull: false 
	}, 
	quantity: {
		type: Sequelize.INTEGER, 
		allowNull: false
	}
})

Product.belongsToMany(Category, { through: OrderProducts });
Order.belongsToMany(Product, { through: 'order_products'}); 


module.exports = {
  Product: Product,
  Category: Category,
  User: User, 
  Order : Order
}
