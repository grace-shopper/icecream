const router = require('express').Router();
const Order = require('../../db/models/orders');
const Product = require('../../db/models/products');

router.get('/', (req, res, next) => {
  Order.findAll()
    .then( orders => res.json(orders) )
    .catch(next);
})

//missing catch
router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
      status: {
        $ne: "In Cart"
      }
    },
    include: [{
      model: Product
    }]
  })
    .then(orders => res.json(orders))
})

module.exports = router;
