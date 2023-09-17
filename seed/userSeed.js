const { UserModel } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123', 
  },
  {
    username: 'jane_doe',
    email: 'jane@example.com',
    password: 'securepass',
  },
  {
    username: 'test_user',
    email: 'test@example.com',
    password: 'testpass',
  },
];

const seedUsers = () => UserModel.bulkCreate(userData);

module.exports = seedUsers;

