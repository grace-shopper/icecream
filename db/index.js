'use strict';

var db = require('./_db');
var models = require('./models');

module.exports = {
	db: db, 
	models : models, 
	User: models.user, 
	Order: models.order
}