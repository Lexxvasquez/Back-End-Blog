const { User } = require('../models');

const userData = [
  {
    username: "lexx",
    email: "lexx.sunshineteam@gmail.com",
    password: "password0915"
  },
  {
    username: "angel",
    email: "angel@gmail.com",
    password: "password0915"
  },
  {
    username: "Jay",
    email: "jay@gmail.com",
    password: "password0915"
  },
  {
    username: "cari",
    email: "caridad@gmail.com",
    password: "password0915"
  },
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;