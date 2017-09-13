const Sequelize = require('sequelize');
const db = require('../_db');

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
        max: 5
      }
  }
});

module.exports = Review;