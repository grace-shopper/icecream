const router = require('express').Router();
const Review = require('../../db/models/reviews');
const db = require('../../db').db;

router.get('/', (req, res, next) => {
  Review.findAll()
    .then( reviews => res.json(reviews) )
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId
    }
  })
  .then(reviews => res.json(reviews))
  .catch(next);
})


module.exports = router;
