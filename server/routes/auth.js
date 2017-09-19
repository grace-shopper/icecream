const router = require('express').Router();
const User = require('../../db/models/users');
const Order = require('../../db/models/orders');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
  passReqToCallback: true
};

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
        Order.findOne({
          where: {
            userId: user.id,
            status: "In Cart"
          }
        })
        .then(order => {
          // need to actually merge the orders here! not replace
          console.log('users order', order)
          req.session.cartId = order.id;
          req.cart = order;
        })
      }
    })
    .catch(next);
});


router.post('/signup', (req, res, next) => {
  console.log('req.session', req.session.cartId)
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
      // create an order
      console.log('req.session.cartId', req.session.cartId)
      if (!req.session.cartId) {
        return Order.create({
          userId: user.id
        })
        .then(order => {
          req.session.cartId = order.id;
          req.cart = order;
          console.log('cart', req.cart)
        })
      }

      // OR UPDATE CURRENT ORDER
      else {
        Order.update(
          {userId: user.id},
          {where: {
            id: req.session.cartId
          }}
        )
        .then(order => {
          req.session.cartId = order.id;
          req.cart = order;
        })
      }
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  req.session.cartId = null;
  req.cart = {};
  res.sendStatus(200);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.get('/google', passport.authenticate('google', { scope: 'email' }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function (req, token, refreshToken, profile, done) {
  const google_id = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  return User.findOne({where: { google_id: google_id  }})
    .then(function (user) {
      if (!user) {
        return User.create({ name, email, google_id })
          .then(function (user) {
            if (req.session.cartId) {
              Order.findById(req.session.cartId)
              .then(order => {
                order.update({userId: user.id})
              })
            }
            else {
              Order.create({userId: user.id})
            }
            done(null, user);
          });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);


module.exports = router;
