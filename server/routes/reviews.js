const router = require('express').Router();
const Review = require('../../db/models/reviews');
const db = require('../../db').db;

router.get('/', (req, res, next) => {
  Review.findAll()
    .then( products => res.json(products) )
    .catch(next);
});

router.get('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(product => res.json(product))
});


module.exports = router;
