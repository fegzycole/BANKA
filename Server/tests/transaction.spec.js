import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models/index';

const { Account } = models;

const { expect } = chai;
chai.use(chaiHttp);


let UserToken = '';
let adminToken = '';
let cashierToken = '';
let accountNumber;

describe(' Transactions test for  POST endpoints', () => {
  before(async () => {
    const { dataValues } = await Account.create({
      accountNumber: 1200000000,
      balance: 0.00,
      owner: 1,
      type: 'savings',
    });
    accountNumber = dataValues.accountNumber;
  });
  before((done) => { // sign in as cashier
    const user = {
      email: 'fergusoncashier@gmail.com',
      password: 'starboy1',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        const { body } = res;
        if (!err) {
          cashierToken = body.data.token;
        }
        done();
      });
  });
  before((done) => { // sign in as admin
    const user = {
      email: 'fergusonadmin@gmail.com',
      password: 'starboy1',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        const { body } = res;
        if (!err) {
          adminToken = body.data.token;
        }
        done();
      });
  });
  describe('POST /transactions/:accountNumber', () => {
    it('it should throw permission error if user is a client and wants to do a credit transaction', (done) => {
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/transaction`)
        .send({
          token: adminToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.eql(403)
          expect(body.status).to.be.equals('error');
          expect(body).to.be.an('object');
          expect(body.errors).to.be.equals('only a cashier can perform cash transactions');
          done();
        });
    });
    it('it should successfully credit an account', (done) => {
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/transaction`)
        .send({
          token: cashierToken,
          type: 'credit',
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals('success');
          expect(body).to.be.an('object');
          done();
        });
    });
    it('it should successfully debit an account', (done) => {
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/transaction`)
        .send({
          token: cashierToken,
          type: 'debit',
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals('success');
          expect(body).to.be.an('object');
          done();
        });
    });
    it('it should throw an error if the account number does not exist', (done) => {
      const accountNumber = 101000000000;
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/transaction`)
        .send({
          token: cashierToken,
          type: 'debit',
          amount: 20000.80,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals('error');
          expect(body).to.be.an('object');
          expect(body.errors).to.be.equals('Account not found');
          done();
        });
    });
    it('it should throw an error if the request body is malformed', (done) => {
      const accountNumber = '100000 0000';
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/transaction`)
        .send({
          token: cashierToken,
          type: 'cred it',
          amount: 'dfldsfmdfdf',
        })
        .end((err, res) => {
          const { body } = res;
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
  after(async () => {
    await Account.destroy({
      where: {
        accountNumber,
      },
    });
  });
});

// describe(' Transactions test for  GET endpoints', () => {
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
