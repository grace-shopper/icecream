const router = require('express').Router();
const Order = require('../../db/models/orders');
const Product = require('../../db/models/products');
const OrderProducts = require('../../db/models/orderProducts');
const Promise = require('bluebird');
const nodemailer = require('nodemailer');

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

  if (!req.cart) {
    Order.findById(req.session.cartId)
    .then(order => {
      req.cart = order
      res.json(req.cart)
    })
  }
  else res.json(req.cart)

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
        Product.update(
          { inventory: product.inventory - orderProducts.quantity},
          { where: {
            id: orderProducts.productId
          }
        })
      })
    })
  })

  // const updateOrderStatusPromise = Order.update(
  //   { status: "Completed", purchasedAt: Date.now() },
  //   { where: {
  //     id: req.session.cartId,
  //     status: "In Cart"
  //   }
  // })

  const oldCartId = req.session.cartId;

  if (!req.user) userId = null
  else userId = req.user.id
  const makeNewCart = Order.create({userId: userId})
  .then(order => {
    req.cart = order
    req.session.cartId = order.id;
  })

  // let promisesArr = [];
  // promisesArr.concat(updateInvPromise).concat(updateOrderStatusPromise);
  // promisesArr.push(makeNewCart);

  return Promise.all(updateInvPromise)
    .then(promise => {
      console.log("promises", promise)
        // send an email that order is pending, and then 20 minutes later, that order send
        // send mail with defined transport object
        console.log('email', req.body.email)
        Order.update(
          { status: "Processing", purchasedAt: Date.now() },
          { where: {
            id: oldCartId
          }
        })
        .then(() => {
          transporter.sendMail(getMailOptions('created', req.body.email), (error, info) => {
          //console.log("HELLO")
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
          });
            setTimeout(()=> {
              transporter.sendMail(getMailOptions('shipped', req.body.email), (error, info) => {
                //console.log("HELLO")
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message %s sent: %s', info.messageId, info.response);
                });
              Order.update(
                  { status: "Shipped", purchasedAt: Date.now() },
                  { where: {
                    id: oldCartId
                  }
                })
            },20000)

            setTimeout(()=> {
              transporter.sendMail(getMailOptions('arrived', req.body.email), (error, info) => {
                //console.log("HELLO")
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message %s sent: %s', info.messageId, info.response);
                });

                Order.update(
                  { status: "Completed", purchasedAt: Date.now() },
                  { where: {
                    id: oldCartId
                  }
                })
            },40000)
            res.json("Order updated")
          })
        })
        .catch(next)

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

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
      user: 'michellescharfstein13@gmail.com',
      pass: 'testingaccount'
  }
});

// setup email data with unicode symbols
function getMailOptions(status, email) {
  let text = ''
  if (status === "created") text = "Thank you for ordering a delicious treat from Gracey Hopper's Ice Screamatorium!  Your order has been created and is being processed. Look out for another email when the order is shipped."
  else if (status === "shipped") text = "Your delicious treat from Gracey Hopper's Ice Screamatorium is around the corner!  Your order has been shipped and should arrive in 1-3 business days."
  else if (status === "arrived") text = "You're in for a yummy afternoon!  Your Gracey Hopper's Ice Screamatorium order has been delivered. Enjoy your ice cream delirium!"

  return mailOptions = {
    from: '"Gracey Hoppers Ice Screamatorium" <michellescharfstein13@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Your Ice Screamatorium Order!', // Subject line
    text: text, // plain text body
    //html: '<b>Hello world ?</b>' // html body
  };
}

module.exports = router;
