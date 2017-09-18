const Sequelize = require('sequelize');
const db = require('../_db');
const User = require('./users');

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
      len:[10, 500]
    }
  },
  rating:{
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
  }
});

module.exports = Review;
