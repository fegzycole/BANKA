const { name, internet } = require('faker');

const { hashSync, genSaltSync } = require('bcryptjs');

const { firstName, lastName } = name;

const { email } = internet;

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: hashSync('customer', genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'customer',
      isAdmin: false,
    },
    {
      firstName: firstName(),
      lastName: lastName(),
      email: 'cashier@banka.com',
      password: hashSync('cashier', genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'cashier',
      isAdmin: true,
    },
    {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: hashSync('customer', genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'customer',
      isAdmin: false,
    },
    {
      firstName: 'Fegor',
      lastName: 'Iyara',
      email: 'admin@banka.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashSync('fegzycole', genSaltSync(10)),
      type: 'admin',
      isAdmin: true,
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
