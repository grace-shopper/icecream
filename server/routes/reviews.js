const router = require('express').Router();
const Review = require('../../db/models/reviews');
const db = require('../../db').db;

// get all reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then( reviews => res.json(reviews) )
    .catch(next);
});

// get reviews by product id
router.get('/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId
    }
  })
  .then(reviews => res.json(reviews))
  .catch(next);
})

// create a new review for a product
router.post('/', (req, res, next) => {
  console.log(' in the reviews route ', req.body)
	Review.create(req.body)
	.then(review => res.json(review))
  .catch(next);
});

module.exports = router;
