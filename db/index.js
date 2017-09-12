'use strict';

var db = require('./_db');
var models = require('./models');
const Category = models.Category;
const Product = models.Product;

module.exports = {
  db: db,
  Product: models.Product,
  Category: models.Category,
  User: models.User
}
