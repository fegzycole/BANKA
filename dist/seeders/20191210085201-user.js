"use strict";

var _require = require('faker'),
    name = _require.name,
    internet = _require.internet,
    lorem = _require.lorem;

var firstName = name.firstName,
    lastName = name.lastName;
var email = internet.email;
var word = lorem.word;
module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false
    }, {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true
    }, {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false
    }, {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false
    }, {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false
    }, {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: word(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false
    }], {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};