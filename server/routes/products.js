const router = require('express').Router();
const Product = require('../../db/models/products');

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
})

module.exports = router;
