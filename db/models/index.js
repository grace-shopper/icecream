const User = require('./users.js');
const Category = require('./category');
const Flavor = require('./flavors');
const Product = require('./products');
const Order = require('./orders.js');
const Review = require('./reviews');
const Cart = require('./cart')
const orderProducts = require('./orderProducts');

// product associations:
// category - many to many
Product.belongsToMany(Category, { through: 'product_categories'});
Category.belongsToMany(Product, { through: 'product_categories'});

// flavor - many to many
Product.belongsToMany(Flavor, { through: 'product_flavors'});
Flavor.belongsToMany(Product, { through: 'product_flavors'});

// reviews
Product.belongsToMany(Review, { through: 'product_reviews'})
Review.belongsTo(Product);

// order associations:
Order.belongsTo(User) // one user to each order
User.belongsToMany(Order, { through: 'user_orders'}) // users can have many orders
Order.belongsToMany(Product, { through: orderProducts}) // order can have many products
Product.belongsToMany(Order, { through: orderProducts}) // and vice versa

// user to product association -> this is representative of that user's cart
User.belongsToMany(Product, { through: Cart})

//review associations:
Review.belongsTo(User)
Review.belongsTo(Product)

module.exports = {
  Product: Product,
  Category: Category,
  Flavor: Flavor,
  User: User,
  Order : Order,
  Review: Review
}
