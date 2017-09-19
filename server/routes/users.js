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

router.put('/:userId', (req, res, next) => {
	User.update(
		req.body,
		{where: { id: req.params.userId}}
	).then(succ => res.json(succ));
})

module.exports = router;
