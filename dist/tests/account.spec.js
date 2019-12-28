"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-undef */
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var userToken = '';
var adminToken = '';
var accountNumber;
var cashierToken = '';
describe('Accounts test for - POST, PATCH, DELETE', function () {
  before(function (done) {
    // sign up as a customer
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'fergusoniyara@gmail.com',
      password: 'starboy1',
      firstName: 'Ferguson',
      lastName: 'Iyara',
      type: 'customer'
    }).end(function (err, res) {
      userToken = res.body.data.token;
      done();
    });
  });
  before(function (done) {
    // sign up as an admin
    var user = {
      email: 'fergusonadmin@gmail.com',
      password: 'starboy1',
      firstName: 'Ferguson',
      lastName: 'Iyara',
      type: 'admin'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      var body = res.body;
      adminToken = body.data.token;
      done();
    });
  });
  before(function (done) {
    // sign up as an admin
    var user = {
      email: 'fergusoncashier@gmail.com',
      password: 'starboy1',
      firstName: 'Ferguson',
      lastName: 'Iyara',
      type: 'cashier'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      done();
    });
  });
  describe('POST api/v1/accounts', function () {
    it('it should create a new account if all checks are fine', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/accounts').send({
        type: 'savings',
        token: userToken
      }).end(function (err, res) {
        accountNumber = res.body.data.accountNumber;
        var body = res.body;
        expect(res).to.have.status(201);
        expect(body.status).to.be.equal('success');
        expect(body.data).to.have.key('id', 'owner', 'status', 'balance', 'type', 'accountNumber', 'updatedAt', 'createdAt');
        done();
      });
    });
    it('it should throw an error if the type field is left empty', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/accounts').send({
        type: '',
        token: userToken
      }).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(400);
        expect(body.status).to.be.equal('error');
        expect(body.errors.type[0]).to.be.equal('The type field is required.');
        done();
      });
    });
    it('it should throw an error if the type field is neither savings or current', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/accounts').send({
        type: 'residual',
        token: userToken
      }).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors.type[0]).to.be.equal('The selected type is invalid.');
        done();
      });
    });
    it('it should throw an error if no token is specified', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/accounts').send({
        type: 'savings'
      }).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors).to.be.equal('You do not have access to this resource');
        done();
      });
    });
    it('it should throw an error if an admin or cashier tries to create an account', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/accounts').send({
        type: 'savings',
        token: adminToken
      }).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(403);
        expect(body.status).to.be.equal('error');
        expect(body.errors).to.eql('only a customer can create an account');
        done();
      });
    });
  });
  describe('PATCH /accounts/:accountNumber', function () {
    it('it should throw permission error if user is not an admin', function (done) {
      var accountNumber = 3089298272728;

      _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(accountNumber)).send({
        token: userToken
      }).end(function (err, res) {
        var body = res.body;
        expect(body.status).to.be.equals('error');
        expect(body).to.be.an('object');
        expect(body.errors).to.be.equals('only an admin can change the status of an account');
        done();
      });
    });
    it('it should activate or deactivate a user bank account', function (done) {
      _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).send({
        status: 'active'
      }).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(200);
        expect(body.status).to.be.equal("success");
        expect(body.data).to.have.key("id", "owner", "status", "balance", "type", "accountNumber", "updatedAt", "createdAt");
        done();
      });
    });
    it('it should throw an error when account number is not in the database', function (done) {
      var accountNumber = 60987655432;

      _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).send({
        status: 'active'
      }).end(function (err, res) {
        var body = res.body;
        expect(res.status).to.eql(404);
        expect(body.status).to.be.equals('error');
        expect(body).to.be.an('object');
        expect(body.errors).to.be.equals('Account not found');
        done();
      });
    });
    it("it should throw an error if the status field is neither active nor dormant", function (done) {
      _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(accountNumber)).send({
        status: 'residual',
        token: adminToken
      }).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors.status[0]).to.be.equal('The selected status is invalid.');
        done();
      });
    });
    it("it should throw an error if the required parameters are malformed", function (done) {
      var accountN0 = '100000 0002';

      _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(accountN0)).send({
        type: '',
        token: adminToken
      }).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal('error');
        expect(res.body.errors.accountNumber[0]).to.be.equal('The accountNumber must be an integer.');
        expect(res.body.errors.status[0]).to.be.equal('The status field is required.');
        done();
      });
    });
  });
  describe('GET /accounts/:accountNumber', function () {
    it('it should retrieve details of a user\'s bank account if everything checks fine', function (done) {
      _chai["default"].request(_app["default"]).get("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).end(function (err, res) {
        var body = res.body;
        expect(res).to.have.status(200);
        expect(body.status).to.be.equal("success");
        expect(body.data).to.have.key("id", "owner", "status", "balance", "type", "accountNumber", "updatedAt", "createdAt");
        done();
      });
    });
  });
  describe('DELETE /accounts/:accountNumber', function () {
    it('it should delete a user bank account if everything checks fine', function (done) {
      _chai["default"].request(_app["default"])["delete"]("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).end(function (err, res) {
        var body = res.body;
        expect(body.status).to.be.equals('success');
        expect(body).to.be.an('object');
        expect(body.data).to.be.equals('Bank account successfully deleted');
        done();
      });
    });
  }); //   describe('POST api/v2/accounts', () => {
  //     it('it should throw error when account type is not specified', (done) => {
  //       chai
  //         .request(app)
  //         .post('/api/v2/accounts')
  //         .send({
  //           type: '',
  //           token: UserToken,
  //         })
  //         .end((err, res) => {
  //           const { body } = res;
  //           expect(body.status).to.be.equals(400);
  //           expect(body).to.be.an('object');
  //           expect(body.error).to.be.equals('This field is required, Account type can only be savings or current');
  //           done();
  //         });
  //     });
  //   });
  //   describe('PATCH /accounts/:accountNumber', () => {
  //     it('it should throw permission error if user is not an admin', (done) => {
  //       const accountNumber = 3089298272728;
  //       chai
  //         .request(app)
  //         .patch(`/api/v2/accounts/${accountNumber}`)
  //         .send({
  //           token: UserToken,
  //         })
  //         .end((err, res) => {
  //           const { body } = res;
  //           expect(body.status).to.be.equals(401);
  //           expect(body).to.be.an('object');
  //           expect(body.error).to.be.equals('You do not have the rights to this resource');
  //           done();
  //         });
  //     });
  //     before('Sign in as an admin ', (done) => {
  //       const userCredential = {
  //         email: 'fegzycole@gmail.com', // Admin account
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
  //             adminToken = body.data.token;
  //           }
  //           done();
  //         });
  //     });
  //     it('it should activate or deactivate a user bank account', (done) => {
  //       const accountNumber = 20000005;
  //       chai
  //         .request(app)
  //         .patch(`/api/v2/accounts/${accountNumber}`)
  //         .set('x-access-token', adminToken)
  //         .send({ status: 'active' })
  //         .end((err, res) => {
  //           const { body } = res;
  //           expect(body.status).to.be.equals(200);
  //           expect(body).to.be.an('object');
  //           expect(body.data).to.haveOwnProperty('accountNo');
  //           expect(body.data).to.haveOwnProperty('status');
  //           done();
  //         });
  //     });
  //     it('it should throw an error when account number is not in the database', (done) => {
  //       const accountNumber = 60987655432;
  //       chai
  //         .request(app)
  //         .patch(`/api/v2/accounts/${accountNumber}`)
  //         .set('x-access-token', adminToken)
  //         .end((err, res) => {
  //           const { body } = res;
  //           expect(body.status).to.be.equals(404);
  //           expect(body).to.be.an('object');
  //           expect(body.error).to.be.equals('Account Not Found');
  //           done();
  //         });
  //     });
  //   });
  //   describe('DELETE /accounts/:accountNumber', () => {
  //     it('it should throw permission error if user is not an admin or staff', (done) => {
  //       const accountNumber = 20000087788725;
  //       chai
  //         .request(app)
  //         .delete(`/api/v2/accounts/${accountNumber}`)
  //         .set('x-access-token', UserToken)
  //         .end((err, res) => {
  //           const { body } = res;
  //           expect(body.status).to.be.equals(401);
  //           expect(body).to.be.an('object');
  //           expect(body.error).to.be.equals('You do not have the rights to this resource');
  //           done();
  //         });
  //     });
  //     it('it should throw an error when account number is not found', (done) => {
  //       const accountNumber = 7091393838393;
  //       chai
  //         .request(app)
  //         .delete(`/api/v2/accounts/${accountNumber}`)
  //         .set('x-access-token', adminToken)
  //         .end((err, res) => {
  //           const { body } = res;
  //           expect(body.status).to.be.equals(404);
  //           expect(body).to.be.an('object');
  //           expect(body.error).to.be.equals('Account Not Found');
  //           done();
  //         });
  //     });
  //   });
  //   before('Sign in as a staff ', (done) => {
  //     const userCredential = {
  //       email: 'fereoomee@gmail.com',
  //       password: 'somepassword1',
  //     };
  //     chai
  //       .request(app)
  //       .post('/api/v2/auth/signin')
  //       .send(userCredential)
  //       .end((err, res) => {
  //         const { body } = res;
  //         expect(body.status).to.be.equals(200);
  //         if (!err) {
  //           cashierToken = body.data.token;
  //         }
  //         done();
  //       });
  //   });
  //   it('it should activate or deactivate a user bank account', (done) => {
  //     const accountNumber = 20000005;
  //     chai
  //       .request(app)
  //       .patch(`/api/v2/accounts/${accountNumber}`)
  //       .set('x-access-token', cashierToken)
  //       .send({ status: 'active' })
  //       .end((err, res) => {
  //         const { body } = res;
  //         expect(body.status).to.be.equals(200);
  //         expect(body).to.be.an('object');
  //         expect(body.data).to.haveOwnProperty('accountNo');
  //         expect(body.data).to.haveOwnProperty('status');
  //         done();
  //       });
  //   });
  //   describe('GET api/v2/accounts/accountnumber/transactions', () => {
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
  //     it('Should throw an error if the account number does not exist', (done) => {
  //       const accountNumber = 200000766;
  //       chai
  //         .request(app)
  //         .get(`/api/v2/accounts/${accountNumber}/transactions`)
  //         .set('x-access-token', UserToken)
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(404);
  //           expect(res.body.error).to.be.equals('Account Not Found');
  //           done();
  //         });
  //     });
  //     it('Should return a list of all transactions for a particular account', (done) => {
  //       const accountNumber = 20000064;
  //       chai
  //         .request(app)
  //         .get(`/api/v2/accounts/${accountNumber}/transactions`)
  //         .set('x-access-token', UserToken)
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(200);
  //           expect(res.body.data).to.be.an('array');
  //           done();
  //         });
  //     });
  //   });
  //   describe('GET api/v2/accounts/accountnumber', () => {
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
  //     it('Should throw an error if the account number does not exist', (done) => {
  //       const accountNumber = 200000766;
  //       chai
  //         .request(app)
  //         .get(`/api/v2/accounts/${accountNumber}`)
  //         .set('x-access-token', UserToken)
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(404);
  //           expect(res.body.error).to.be.equals('Account Not Found');
  //           done();
  //         });
  //     });
  //     it('Should return a list of all transactions for a particular account', (done) => {
  //       const accountNumber = 20000005;
  //       chai
  //         .request(app)
  //         .get(`/api/v2/accounts/${accountNumber}`)
  //         .set('x-access-token', UserToken)
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(200);
  //           expect(res.body.data).to.be.an('object');
  //           done();
  //         });
  //     });
  //   });
  //   describe('GET api/v2/accounts', () => {
  //     it('Should throw an error if a client wants to view a list of all the accounts', (done) => {
  //       chai
  //         .request(app)
  //         .get('/api/v2/accounts')
  //         .set('x-access-token', UserToken)
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(401);
  //           expect(res.body.error).to.be.equals('You do not have the rights to this resource');
  //           done();
  //         });
  //     });
  //   });
  //   describe('GET api/v2/accounts', () => {
  //     it('Should return a list of all accounts in the database', (done) => {
  //       chai
  //         .request(app)
  //         .get('/api/v2/accounts')
  //         .set('x-access-token', cashierToken)
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(200);
  //           expect(res.body.data).to.be.an('array');
  //           done();
  //         });
  //     });
  //   });
  //   describe('GET api/v2/accounts', () => {
  //     it('Should throw an error if user doesnt put in a token', (done) => {
  //       chai
  //         .request(app)
  //         .get('/api/v2/accounts')
  //         .set('x-access-token', '')
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(404);
  //           expect(res.body.error).to.be.equals('You cannot access this resource');
  //           done();
  //         });
  //     });
  //     it('Should throw an error if user puts in an invalid token', (done) => {
  //       chai
  //         .request(app)
  //         .get('/api/v2/accounts')
  //         .set('x-access-token', 'fdskfldsjklgfjkldskljsfkldskfsdkjfsdfsdlkdsfjs')
  //         .end((err, res) => {
  //           expect(res.body.status).to.be.equals(404);
  //           expect(res.body.error).to.be.equals('Invalid token');
  //           done();
  //         });
  //     });
  //   });
});