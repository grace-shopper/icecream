const router = require('express').Router();

// TODO: Add individual routers
/*
ex:
router.use('/someRoute', require('./someRoute'))
*/


router.use('/products', require('./routes/products'))
router.use('/users', require('./routes/users'))
router.use('/orders', require('./routes/orders'))
router.use('/auth', require('./routes/auth'))
router.use('/cart', require('./routes/cart'))
router.use('/categories', require('./routes/categories'))


router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
})

module.exports = router;
