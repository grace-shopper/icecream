const router = require('express').Router();
const Order = require('../db/models/orders');
// store quantity of cart
router.use((req, res, next) => {
  if (!req.session.cartId) {
    if (req.user) {
      console.log('user', req.user)
      Order.findOne({
        where: {
          userId: req.user.id,
          status: "In Cart"
        }
      })
      // a user logins in but doesn't have a cart, nothing is returned
      .then(cart => {
        req.cart = cart
        req.session.cartId = cart.id
      })
    }
  }
  next()
})

module.exports = router;
