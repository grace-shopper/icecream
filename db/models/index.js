const Product = require('./products');
const Category = require('./category');
const User = require('./users');

Product.belongsToMany(Category, { through: 'product_categories'});

module.exports = {
  Product: Product,
  Category: Category,
  User: User
}
