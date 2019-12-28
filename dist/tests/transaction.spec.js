"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Account = _index["default"].Account;
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var UserToken = '';
var adminToken = '';
var cashierToken = '';
var accountNumber;
describe(' Transactions test for  POST endpoints', function () {
  before(function _callee() {
    var _ref, dataValues;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Account.create({
              accountNumber: 1200000000,
              balance: 0.00,
              owner: 1,
              type: 'savings'
            }));

          case 2:
            _ref = _context.sent;
            dataValues = _ref.dataValues;
            accountNumber = dataValues.accountNumber;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  before(function (done) {
    // sign in as cashier
    var user = {
      email: 'fergusoncashier@gmail.com',
      password: 'starboy1'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(user).end(function (err, res) {
      var body = res.body;

      if (!err) {
        cashierToken = body.data.token;
      }

      done();
    });
  });
  before(function (done) {
    // sign in as admin
    var user = {
      email: 'fergusonadmin@gmail.com',
      password: 'starboy1'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(user).end(function (err, res) {
      var body = res.body;

      if (!err) {
        adminToken = body.data.token;
      }

      done();
    });
  });
  describe('POST /transactions/:accountNumber', function () {
    it('it should throw permission error if user is a client and wants to do a credit transaction', function (done) {
      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/transaction")).send({
        token: adminToken,
        amount: 2500
      }).end(function (err, res) {
        var body = res.body;
        expect(res.status).to.eql(403);
        expect(body.status).to.be.equals('error');
        expect(body).to.be.an('object');
        expect(body.errors).to.be.equals('only a cashier can perform cash transactions');
        done();
      });
    });
    it('it should successfully credit an account', function (done) {
      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/transaction")).send({
        token: cashierToken,
        type: 'credit',
        amount: 2500
      }).end(function (err, res) {
        var body = res.body;
        expect(body.status).to.be.equals('success');
        expect(body).to.be.an('object');
        done();
      });
    });
    it('it should successfully debit an account', function (done) {
      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/transaction")).send({
        token: cashierToken,
        type: 'debit',
        amount: 2500
      }).end(function (err, res) {
        var body = res.body;
        expect(body.status).to.be.equals('success');
        expect(body).to.be.an('object');
        done();
      });
    });
    it('it should throw an error if the account number does not exist', function (done) {
      var accountNumber = 101000000000;

      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/transaction")).send({
        token: cashierToken,
        type: 'debit',
        amount: 20000.80
      }).end(function (err, res) {
        var body = res.body;
        expect(body.status).to.be.equals('error');
        expect(body).to.be.an('object');
        expect(body.errors).to.be.equals('Account not found');
        done();
      });
    });
    it('it should throw an error if the request body is malformed', function (done) {
      var accountNumber = '100000 0000';

      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/transaction")).send({
        token: cashierToken,
        type: 'cred it',
        amount: 'dfldsfmdfdf'
      }).end(function (err, res) {
        var body = res.body;
        expect(body.status).to.be.equals('error');
        expect(body).to.be.an('object');
        expect(body.errors.type[0]).to.be.equals('The selected type is invalid.');
        expect(body.errors.accountNumber[0]).to.be.equals('The accountNumber must be an integer.');
        expect(body.errors.amount[0]).to.be.equals('The amount must be a number.');
        expect(body.errors.amount[1]).to.be.equals('The amount must be at least 0.');
        done();
      });
    });
  });
  after(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Account.destroy({
              where: {
                accountNumber: accountNumber
              }
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}); // describe(' Transactions test for  GET endpoints', () => {
//   describe('GET api/v2/transactions/transactionid', () => {
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
//     it('Should throw an error if the id does not exist', (done) => {
//       const id = 120000;
//       chai
//         .request(app)
//         .get(`/api/v2/transactions/${id}`)
//         .set('x-access-token', UserToken)
//         .end((err, res) => {
//           expect(res.body.status).to.be.equals(404);
//           expect(res.body.error).to.be.equals('No Transaction with the stated ID');
//           done();
//         });
//     });
//     it('Should return a specific transaction if its ID is correct', (done) => {
//       const id = 3;
//       chai
//         .request(app)
//         .get(`/api/v2/transactions/${id}`)
//         .set('x-access-token', UserToken)
//         .end((err, res) => {
//           expect(res.body.status).to.be.equals(200);
//           expect(res.body.data).to.be.an('object');
//           done();
//         });
//     });
//   });
// });