const router = require('express').Router();
const Order = require('../db/models/orders');
// store quantity of cart
router.use((req, res, next) => {

  // if there's not a cartId on the session yet...
  if (!req.session.cartId) {
    if (req.user) {
      Order.findOne({
        where: {
          userId: req.user.id,
          status: "In Cart"
        }
      })
      .then(cart => {
        req.cart = cart
        req.session.cartId = cart.id
      })
      .catch(next)
    }
  }

  // if there is a session id
  else {
    Order.findById(req.session.cartId)
    .then(cart => {
      req.cart = cart;
    })
    .catch(next)
  }

  next()
})

module.exports = router;
