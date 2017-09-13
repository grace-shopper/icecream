const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

const {db, Category, Flavor, Product, User, Order} = require('../db/index.js');

require('../dev')
if (process.env.NODE_ENV === 'development') {
  require('../localSecrets'); // this will mutate the process.env object with your secrets.
}

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
	store: dbStore,
  resave: false,
  saveUninitialized: false
}));

app.use(require('./passport.middleware'));


app.use('/api', require('./api'));
app.get('/*', (_, res) => { res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;


db.sync({force: true})
	.then(() => {
		app.listen(
			process.env.PORT || 1337,
			() => {
				console.log(`----started HTTP server for icecream on port ${process.env.PORT || 1337}----`);
			}
		)
	})
