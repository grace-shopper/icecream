const Sequelize = require('sequelize');
const db = require('../_db');

const Flavors = db.define('flavors', {
  flavor: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});
