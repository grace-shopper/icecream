'use strict';

var db = require('./_db');
var models = require('./models');

module.exports = {
	db: db, 
	User: models.user
	//Order: models.order
}