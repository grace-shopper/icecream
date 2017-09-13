const passport = require('passport');
const User = require('../db/models/users');
const router = require('express').Router();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
    // OB/CJP: try..catch necessary?
    try {
        done(null, user.id);
    } catch (err) {
        done(err);
    }
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(done);
});

module.exports = router;