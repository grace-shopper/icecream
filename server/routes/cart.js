const router = require('express').Router();
const Order = require('../../db/models/orders');
const Product = require('../../db/models/products');
const OrderProducts = require('../../db/models/orderProducts');

// create order
router.post('/new', (req, res, next) => {
  const productPromise = Product.findById(req.body.product.id)
  const orderPromise = Order.create({})

  Promise.all([productPromise, orderPromise])
    .then(data => {
      const product = data[0];
      const order = data[1];
      req.session.cartId = order.id;
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
  const productPromise = Product.findById(req.body.product.id)
  const orderPromise = Order.findById(req.session.cartId)

  Promise.all([productPromise, orderPromise])
    .then(data => {
      const product = data[0];
      const order = data[1];
      OrderProducts.find({
        where: {
          orderId: order.id,
          productId: product.id
        }
      })
      .then(orderprod => {
        if (!orderprod) {
          return OrderProducts.create(
            {
              orderId: order.id,
              productId: product.id,
              quantity: req.body.quantity,
              originalPrice: product.price
            }
          )
        }
        else {
          return orderprod.update({
            quantity: +orderprod.quantity + +req.body.quantity,
            originalPrice: product.price
          })
        }
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

router.get('/', (req, res, next) => {
  if (req.session.cartId) {
    return Order.findById(req.session.cartId)
      .then(cartOrder => {
        req.cart = cartOrder;
        res.json(cartOrder)
      })
  }
  else return null;
})

module.exports = router;
