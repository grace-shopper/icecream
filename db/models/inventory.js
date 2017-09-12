const Sequelize = require('sequelize');
const db = require('../_db');

const Inventory = db.define('inventory', {
  flavor: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Inventory;
