const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

const db = require('../db/_db.js');

require('../secret');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();

app.use(session({
  secret: process.env.SESSION_SECRET,
	store: dbStore,
  resave: false,
  saveUninitialized: false
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api'));
app.get('/*', (_, res) => { res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;

db.sync()
	.then(() => {
		app.listen(
			process.env.PORT || 1337,
			() => {
				console.log(`----started HTTP server for (out)fit----`);
			}
		)
	})
