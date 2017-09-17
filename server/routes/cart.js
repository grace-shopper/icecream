const router = require('express').Router();
const Order = require('../../db/models/orders');
const Product = require('../../db/models/products');
const OrderProducts = require('../../db/models/orderProducts');
const Promise = require('bluebird');

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

router.post('/edit', (req, res, next) => {
  const productPromise = Product.findById(req.body.productId)
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
          return orderprod.update({
            quantity: +req.body.quantity,
            originalPrice: product.price
          })
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
        if (!cartOrder) cartOrder = {}
        req.cart = cartOrder;
        res.json(cartOrder)
      })
  }
  else return null;
})

router.put('/', (req, res, next) => {

  const updateInvPromise = Order.findById(req.session.cartId)
  .then(order => {
    const products = order.getProducts();
    return Promise.map(products, (product) => {
      OrderProducts.findOne({
        where: {
          orderId: order.id,
          productId: product.id
        }
      })
      .then(orderProducts => {
        if (orderProducts.quantity > product.inventory) {
          throw new Error(`Not enough inventory of ${product.name} left to complete your purchase`)
        }
        console.log('current inventory', product.inventory)
        console.log('purchased quantity', orderProducts.quantity)
        Product.update(
          { inventory: product.inventory - orderProducts.quantity},
          { where: {
            id: orderProducts.productId
          }
        })
      })
    })
  })

  const updateOrderStatusPromise = Order.update(
    { status: "Purchased", purchasedAt: Date.now() },
    { where: {
      id: req.session.cartId,
      status: "In Cart"
    }
  })

  Promise.all([updateInvPromise,updateOrderStatusPromise])
    .then(promises => {
      Order.create({})
      .then(order => {
        req.cart = order
        req.session.cartId = order.id;
        // send an email that order is pending, and then 20 minutes later, that order send
        // a day later, order arrives?
        res.json(order)
      })
    })
})

router.delete('/:productId', (req, res, next) => {
  const productPromise = Product.findById(req.params.productId)
  const orderPromise = Order.findById(req.session.cartId)

  Promise.all([productPromise, orderPromise])
    .then(data => {
      const product = data[0];
      const order = data[1];
      OrderProducts.destroy({
        where: {
          orderId: order.id,
          productId: product.id
        }
      })
    })
})

router.get('/:userId', (req, res, next) => {
  return Order.findOne({
    where: {
      userId: req.params.userId,
      status: "In Cart"
    }
  })
  .then(cart => {
    if (!cart) cart = {}
    req.cart = cart;
    res.json(cart)
  })
})


module.exports = router;
