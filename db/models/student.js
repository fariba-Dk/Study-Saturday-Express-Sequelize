const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

Student.beforeCreate((student) => {
  const f = student.firstName; //getting
  const l = student.lastName; //getting

  //setting the
  student.firstName = f[0].toUpperCase() + f.slice(1);
  student.lastName = l[0].toUpperCase() + l.slice(1);
});

module.exports = Student;
