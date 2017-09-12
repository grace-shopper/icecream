const router = require('express').Router();

// TODO: Add individual routers
/*
ex:
router.use('/someRoute', require('./someRoute'))
*/

router.use('/auth', require('./auth'))

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
})

module.exports = router;
