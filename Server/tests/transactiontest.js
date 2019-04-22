/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);


let UserToken = '';
let adminToken = '';
let cashierToken = '';

describe(' Transactions test for  POST endpoints', () => {
  before((done) => {
    const user = {
      email: 'sobed2smile@gmail.com',
      password: 'password2',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        if (!err) {
          UserToken = body.data.token;
        }
        done();
      });
  });
  describe('POST /transactions/:accountNumber', () => {
    it('it should throw permission error if user is a client and wants to do a credit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .send({
          token: UserToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
    it('it should throw permission error if user is a client and wants to do a debit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .send({
          token: UserToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
    before('Sign in as an admin ', (done) => {
      const userCredential = {
        email: 'fergusoniyara@gmail.com', // Admin account
        password: 'somepassword',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(userCredential)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          if (!err) {
            adminToken = body.data.token;
          }
          done();
        });
    });
    it('it should throw permission error if user is an admin and wants to do a credit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .send({
          token: adminToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
    it('it should throw permission error if user is an admin and wants to do a debit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .send({
          token: adminToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
  });
  before('Sign in as a staff ', (done) => {
    const userCredential = {
      email: 'mfontana@gmail.com',
      password: 'daysOfYourLife',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(userCredential)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        if (!err) {
          cashierToken = body.data.token;
        }
        done();
      });
  });
  // it('it should successfully credit an account', (done) => {
  //   const accountNumber = 3089298272728;
  //   chai
  //     .request(app)
  //     .post(`/api/v1/transactions/${accountNumber}/credit`)
  //     .send({
  //       token: cashierToken,
  //       amountToDeposit: 2500,
  //     })
  //     .end((err, res) => {
  //       const { body } = res;
  //       expect(body.status).to.be.equals(200);
  //       expect(body).to.be.an('object');
  //       expect(res.body.data).to.have.key('transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance');
  //       done();
  //     });
  // });
  // it('it should successfully debit an account', (done) => {
  //   const accountNumber = 3089298272728;
  //   chai
  //     .request(app)
  //     .post(`/api/v1/transactions/${accountNumber}/debit`)
  //     .send({
  //       token: cashierToken,
  //       amountToDeposit: 2500,
  //     })
  //     .end((err, res) => {
  //       const { body } = res;
  //       expect(body.status).to.be.equals(200);
  //       expect(body).to.be.an('object');
  //       expect(res.body.data).to.have.key('transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance');
  //       done();
  //     });
  // });
  // it('it should throw an error if the amount to withdraw is not a number', (done) => {
  //   const accountNumber = 3089298272728;
  //   chai
  //     .request(app)
  //     .post(`/api/v1/transactions/${accountNumber}/debit`)
  //     .send({
  //       token: cashierToken,
  //       amountToDeposit: 'dfldsfmdfdf',
  //     })
  //     .end((err, res) => {
  //       const { body } = res;
  //       expect(body.status).to.be.equals(400);
  //       expect(body).to.be.an('object');
  //       expect(body.message).to.be.equals('Please put in a number to Withdraw');
  //       done();
  //     });
  // });
  // it('it should throw an error if the amount to deposit is not a number', (done) => {
  //   const accountNumber = 3089298272728;
  //   chai
  //     .request(app)
  //     .post(`/api/v1/transactions/${accountNumber}/credit`)
  //     .send({
  //       token: cashierToken,
  //       amountToDeposit: 'dfldsfmdfdf',
  //     })
  //     .end((err, res) => {
  //       const { body } = res;
  //       expect(body.status).to.be.equals(400);
  //       expect(body).to.be.an('object');
  //       expect(body.message).to.be.equals('Please put in a number to Deposit');
  //       done();
  //     });
  // });
});

describe(' Transactions test for  POST endpoints', () => {
  before((done) => {
    const user = {
      email: 'fegorson@gmail.com',
      password: 'somepassword1',
    };
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        if (!err) {
          UserToken = body.data.token;
        }
        done();
      });
  });
  describe('POST /transactions/:accountNumber', () => {
    it('it should throw permission error if user is a client and wants to do a credit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v2/transactions/${accountNumber}/credit`)
        .send({
          token: UserToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
    it('it should throw permission error if user is a client and wants to do a debit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v2/transactions/${accountNumber}/debit`)
        .send({
          token: UserToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
    before('Sign in as an admin ', (done) => {
      const userCredential = {
        email: 'fegzycole@gmail.com', // Admin account
        password: 'somepassword1',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(userCredential)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          if (!err) {
            adminToken = body.data.token;
          }
          done();
        });
    });
    it('it should throw permission error if user is an admin and wants to do a credit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v2/transactions/${accountNumber}/credit`)
        .send({
          token: adminToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
    it('it should throw permission error if user is an admin and wants to do a debit transaction', (done) => {
      const accountNumber = 3089298272728;
      chai
        .request(app)
        .post(`/api/v2/transactions/${accountNumber}/debit`)
        .send({
          token: adminToken,
          amount: 2500,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
  });
  before('Sign in as a staff ', (done) => {
    const userCredential = {
      email: 'fereoomee@gmail.com',
      password: 'somepassword1',
    };

    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(userCredential)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        if (!err) {
          cashierToken = body.data.token;
        }
        done();
      });
  });
  it('it should successfully credit an account', (done) => {
    const accountNumber = 20000006;
    chai
      .request(app)
      .post(`/api/v2/transactions/${accountNumber}/credit`)
      .send({
        token: cashierToken,
        amountToDeposit: 2500.50,
        type: 'credit',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body).to.be.an('object');
        expect(res.body.data).to.have.key('transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance');
        done();
      });
  });
  it('it should successfully debit an account', (done) => {
    const accountNumber = 20000006;
    chai
      .request(app)
      .post(`/api/v2/transactions/${accountNumber}/debit`)
      .send({
        token: cashierToken,
        amountToDeposit: 2500.50,
        type: 'debit',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body).to.be.an('object');
        expect(res.body.data).to.have.key('transactionId', 'accountNumber', 'amount', 'cashier', 'transactionType', 'accountBalance');
        done();
      });
  });
  it('it should throw an error if the amount to withdraw is not a number', (done) => {
    const accountNumber = 20000006;
    chai
      .request(app)
      .post(`/api/v2/transactions/${accountNumber}/debit`)
      .send({
        token: cashierToken,
        amountToDeposit: 'dfldsfmdfdf',
        type: 'debit',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(400);
        expect(body).to.be.an('object');
        expect(body.message).to.be.equals('Please put in a number');
        done();
      });
  });
});
