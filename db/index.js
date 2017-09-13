'use strict';

var db = require('./_db');
var models = require('./models');

module.exports = {
  db: db,
  Product: models.Product,
  Category: models.Category,
  Flavor: models.Flavor,
  User: models.User,
	Order: models.Order
}

