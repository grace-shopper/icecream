//'use strict'

const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/icecream', {
	
});

module.exports = db;
