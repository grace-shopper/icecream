const router = require('express').Router();
const Order = require('../../db/models/orders');
const Product = require('../../db/models/products');
const OrderProducts = require('../../db/models/orderProducts');

// create order
router.post('/new', (req, res, next) => {
  const productPromise = Product.findById(req.body.productId)
  const orderPromise = Order.create({})

  Promise.all([productPromise, orderPromise])
    .then(data => {
      const product = data[0];
      const order = data[1];
      req.session.cartId = order.id;
      //req.cart = order; //will this have the products associated with this order?
      OrderProducts.create({
          orderId: order.id,
          productId: product.id,
          quantity: req.body.quantity,
          originalPrice: product.price
      })
      .then(orderProduct => {
        Order.findById(orderProduct.orderId)
          .then(order => {
            req.cart = order
            res.json(order)
          })
      })
    })
})

// add to order
router.post('/', (req, res, next) => {
  const productPromise = Product.findById(req.body.productId)
  const orderPromise = Order.findById(req.session.cartId)

  Promise.all([productPromise, orderPromise])
    .then(data => {
      const product = data[0];
      const order = data[1];
      OrderProducts.create({
          orderId: order.id,
          productId: product.id,
          quantity: req.body.quantity,
          originalPrice: product.price
      })
      .then(orderProduct => {
        Order.findById(orderProduct.orderId)
          .then(order => {
            req.cart = order
            res.json(order)
          })
      })
    })
})

// unauthenticated
router.get('/', (req, res, next) => {
  return Order.findById(req.session.cartId)
    .then(cartOrder => res.json(cartOrder))
})

module.exports = router;
