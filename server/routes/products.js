const router = require('express').Router();
const Product = require('../../db/models/products');


router.get('/', (req, res, next) => {
  Product.findAll()
    .then( products => res.json(products) )
    .catch(next);
})

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
})

module.exports = router;
