const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('test', {
  Subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
});

Test.belongsToMany(student);
module.exports = Test;
