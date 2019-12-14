const { name, internet, lorem } = require('faker');

const { firstName, lastName } = name;

const { email } = internet;

const { word } = lorem;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    },
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true,
    },
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    },
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    },
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    },
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
