/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai from 'chai';

import { internet } from 'faker';

import chaiHttp from 'chai-http';

import app from '../app';
import models from '../models/index';

const { User } = models;

const { expect } = chai;

chai.use(chaiHttp);

const { email } = internet;

let UserToken;
let adminToken;
let cashierToken;
let userEmail;

describe('Tests for all Auth(signup and signin) Endpoints', () => {
  describe('POST api/v1/auth/signup', () => {
    it('Should successfully sign up a user and return a token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: email(),
          password: 'Pasword2018',
          firstName: 'Ferguson',
          lastName: 'Iyara',
          type: 'customer',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data).to.have.key('id', 'email', 'firstName', 'lastName', 'type', 'isAdmin', 'updatedAt', 'createdAt', 'token');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if the required parameters are empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          type: '',
        })
        .end((err, res) => {
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
    it('Should return an error if any of the required parameters is malformed', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon y',
          lastName: 'middl ename',
          email: 'jo n@gmail.com',
          password: 'simple andsweet',
          type: 'serviceman',
        })
        .end((err, res) => {
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
  describe('POST api/v1/auth/signin', () => {
    it('should successfully signin an already created user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'fergusoniyara@gmail.com',
          password: 'starboy1',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data).to.have.key('id', 'email', 'firstName', 'lastName', 'type', 'isAdmin', 'updatedAt', 'createdAt', 'token');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if the required parameters are empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.errors.email[0]).to.be.equal('The email field is required.');
          expect(res.body.errors.password[0]).to.be.equal('The password field is required.');
          done();
        });
    });
    it('Should return an error if the email does not exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'someemail@gmail.com',
          password: 'somethingnice',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.errors).to.be.equal('User not found');
          done();
        });
    });
    it('Should return an error if the password is incorrect', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'fergusoniyara@gmail.com',
          password: 'somethingnice',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.errors).to.be.equal('Authentication Failed, Email or Password Incorrect');
          done();
        });
    });
    after(async () => {
      await User.destroy({
        where: {
          email: 'fergusoniyara@gmail.com',
        },
      });
      await User.destroy({
        where: {
          email: 'fergusonadmin@gmail.com',
        },
      });
    });
  });
  describe('DELETE api/v1/auth/', () => {
    before(async () => {
      const response = await User.create({
        firstName: 'John',
        lastName: 'Freggs',
        email: 'jjcash12569@gmail.com',
        type: 'cashier',
        isAdmin: false,
        password: 'somepassword',
      });

      userEmail = response.dataValues.email;
    });

    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'admin@banka.com',
          password: 'fegzycole',
        })
        .end((err, res) => {
          adminToken = res.body.data.token;
          done();
        });
    });

    it('Should successfully delete a staff account', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/auth/${userEmail}/user`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.equal('Staff deleted successfully');
          done();
        });
    });
  });
});


// describe('Test for User Endpoint', () => {
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
