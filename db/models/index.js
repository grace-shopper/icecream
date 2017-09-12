const User = require('./users.js'); 
const Order = require('./orders.js'); 
const Product = require('./products');
const Category = require('./category');

Product.belongsToMany(Category, { through: 'product_categories'});

module.exports = {
  Product: Product,
  Category: Category,
  User: User, 
  Order : Order
}
