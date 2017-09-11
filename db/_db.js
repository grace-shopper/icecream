//'use strict'

const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/outfit', {
  
});

module.exports = db;
