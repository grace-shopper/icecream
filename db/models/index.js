const User = require('./users.js');
const Order = require('./orders.js');
const Product = require('./products');
const Category = require('./category');
const Flavor = require('./flavors');
const Review = require('./reviews');

// product associations:
// category - many to many
Product.belongsToMany(Category, { through: 'product_categories'});
Category.belongsToMany(Product, { through: 'product_categories'});

// flavor - many to many
Product.belongsToMany(Flavor, { through: 'product_flavors'});
Flavor.belongsToMany(Product, { through: 'product_flavors'});

// order associations:
Order.belongsTo(User) // one user to each order
User.belongsToMany(Order, { through: 'user_orders'}) // users can have many orders
Order.belongsToMany(Product, { through: 'order_products'}) // order can have many products
Product.belongsToMany(Order, { through: 'order_products'}) // and vice versa

// user to product association -> this is representative of that user's cart
User.belongsToMany(Product, { through: 'user_carts'})

//review associations:
Review.belongsTo(User)
Review.belongsTo(Product)

module.exports = {
  Product: Product,
  Category: Category,
  User: User,
  Order : Order,
  Review: Review
}
