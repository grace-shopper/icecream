const Sequelize = require('sequelize');
const db = require('../_db');

const Flavor = db.define('flavor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Flavor;
