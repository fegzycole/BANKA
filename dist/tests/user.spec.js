"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _faker = require("faker");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
var User = _index["default"].User;
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var email = _faker.internet.email;
var UserToken;
var adminToken;
var cashierToken;
describe('Tests for all Auth(signup and signin) Endpoints', function () {
  describe('POST api/v1/auth/signup', function () {
    it('Should successfully sign up a user and return a token', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        email: email(),
        password: 'Pasword2018',
        firstName: 'Ferguson',
        lastName: 'Iyara',
        type: 'customer'
      }).end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data).to.have.key('id', 'email', 'firstName', 'lastName', 'type', 'isAdmin', 'updatedAt', 'createdAt', 'token');
        expect(res.body.data.token).to.be.a('string');
        done();
      });
    });
    it('Should return an error if the required parameters are empty', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        type: ''
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors.firstName[0]).to.be.equal('The firstName field is required.');
        expect(res.body.errors.lastName[0]).to.be.equal('The lastName field is required.');
        expect(res.body.errors.email[0]).to.be.equal('The email field is required.');
        expect(res.body.errors.password[0]).to.be.equal('The password field is required.');
        expect(res.body.errors.type[0]).to.be.equal('The type field is required.');
        done();
      });
    });
    it('Should return an error if any of the required parameters is malformed', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'jon y',
        lastName: 'middl ename',
        email: 'jo n@gmail.com',
        password: 'simple andsweet',
        type: 'serviceman'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors.firstName[0]).to.be.equal('The firstName field must contain only alphabetic characters.');
        expect(res.body.errors.lastName[0]).to.be.equal('The lastName field must contain only alphabetic characters.');
        expect(res.body.errors.email[0]).to.be.equal('The email format is invalid.');
        expect(res.body.errors.password[0]).to.be.equal('The password field must be alphanumeric.');
        expect(res.body.errors.type[0]).to.be.equal('The selected type is invalid.');
        done();
      });
    });
  });
  describe('POST api/v1/auth/signin', function () {
    it('should successfully signin an already created user', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'fergusoniyara@gmail.com',
        password: 'starboy1'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data).to.have.key('id', 'email', 'firstName', 'lastName', 'type', 'isAdmin', 'updatedAt', 'createdAt', 'token');
        expect(res.body.data.token).to.be.a('string');
        done();
      });
    });
    it('Should return an error if the required parameters are empty', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: '',
        password: ''
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors.email[0]).to.be.equal('The email field is required.');
        expect(res.body.errors.password[0]).to.be.equal('The password field is required.');
        done();
      });
    });
    it('Should return an error if the email does not exist', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'someemail@gmail.com',
        password: 'somethingnice'
      }).end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors).to.be.equal('User not found');
        done();
      });
    });
    it('Should return an error if the password is incorrect', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'fergusoniyara@gmail.com',
        password: 'somethingnice'
      }).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors).to.be.equal('Authentication Failed, Email or Password Incorrect');
        done();
      });
    });
    after(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(User.destroy({
                where: {
                  email: 'fergusoniyara@gmail.com'
                }
              }));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(User.destroy({
                where: {
                  email: 'fergusonadmin@gmail.com'
                }
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  });
}); // describe('Test for User Endpoint', () => {
//   describe('GET api/v2/user/<user-email-address>/accounts', () => {
//     before((done) => {
//       const user = {
//         email: 'fegorson@gmail.com',
//         password: 'somepassword1',
//       };
//       chai
//         .request(app)
//         .post('/api/v2/auth/signin')
//         .send(user)
//         .end((err, res) => {
//           const { body } = res;
//           expect(body.status).to.be.equals(200);
//           if (!err) {
//             UserToken = body.data.token;
//           }
//           done();
//         });
//     });
//   });
// });
// describe('Test for User Endpoint', () => {
//   describe('GET api/v2/user/<user-email-address>/accounts', () => {
//     before((done) => {
//       const userCredential = {
//         email: 'fereoomee@gmail.com',
//         password: 'somepassword1',
//       };
//       chai
//         .request(app)
//         .post('/api/v2/auth/signin')
//         .send(userCredential)
//         .end((err, res) => {
//           const { body } = res;
//           expect(body.status).to.be.equals(200);
//           if (!err) {
//             cashierToken = body.data.token;
//           }
//           done();
//         });
//     });
//     it('Should return an error if the email is not found', (done) => {
//       const email = 'mariana@gmail.com';
//       chai
//         .request(app)
//         .get(`/api/v2/user/${email}/accounts`)
//         .set('x-access-token', cashierToken)
//         .end((err, res) => {
//           expect(res.body.status).to.be.equals(404);
//           expect(res.body.error).to.be.equals('Email does not exist');
//           done();
//         });
//     });
//     it('Should return a list of all accounts belonging to a user', (done) => {
//       const email = 'fereoomee@gmail.com';
//       chai
//         .request(app)
//         .get(`/api/v2/user/${email}/accounts`)
//         .set('x-access-token', cashierToken)
//         .end((err, res) => {
//           expect(res.body.status).to.be.equals(200);
//           expect(res.body.accounts).to.be.an('array');
//           done();
//         });
//     });
//   });
// });
// describe('Test for password reset endpoint', () => {
//   describe('GET api/v2/auth/<email-address>', () => {
//     it('Should return an error if the email does not exist', (done) => {
//       const email = 'mariana@gmail.com';
//       chai
//         .request(app)
//         .post(`/api/v2/auth/${email}/reset`)
//         .send({ password: 'Password@2018' })
//         .end((err, res) => {
//           expect(res.body.status).to.be.equals(404);
//           expect(res.body.error).to.be.equals('Email does not exist');
//           done();
//         });
//     });
//     it('Should successfully reset a user password and send a mail', (done) => {
//       const email = 'fergusoniyara@gmail.com';
//       chai
//         .request(app)
//         .post(`/api/v2/auth/${email}/reset`)
//         .send({ password: 'Password@2018' })
//         .end((err, res) => {
//           expect(res.body.status).to.be.equals(200);
//           expect(res.body.data).to.be.equals('message sent');
//           done();
//         });
//     });
//   });
// });
// // Test that handles non-existent routes
// describe('GET *', () => {
//   it('Should throw a 404 error', (done) => {
//     chai
//       .request(app)
//       .get('/account/number/try')
//       .end((err, res) => {
//         if (err) done();
//         const { body } = res;
//         expect(body).to.be.an('object');
//         expect(body.status).to.be.equals(404);
//         expect(body.error).to.be.equals('The specified route does not exist');
//         done();
//       });
//   });
// });