const router = require('express').Router();
const User = require('../../db/models/users');

router.get('/', (req, res, next) => {
  User.findAll()
    .then( users => res.json(users) )
    .catch(next);
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
})

module.exports = router;
