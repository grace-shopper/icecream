const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/api', require('./api'));
app.get('/*', (_, res) => { res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;

const server = app.listen(
	process.env.PORT || 1337,
	() => {
		console.log(`----started HTTP server for (out)fit----`);
	}
)
