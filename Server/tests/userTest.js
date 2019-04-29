/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

let UserToken;
let adminToken;
let cashierToken;

describe('Tests for all Auth(signup and signin) Endpoints', () => {
  describe('POST api/v1/auth/signup', () => {
    it('Should successfully sign up a user and return a token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpleandweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data).to.have.key('id', 'token', 'firstName', 'lastName', 'email', 'type', 'isAdmin');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if the user provides an invalid email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'wrongmailaddress',
          password: 'simpleandweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('Your Email is required, example fergusoniyara@banka.com');
          done();
        });
    });
    it('Should return an error if the user provides password with whitespace in between', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpl eand',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('Password should be at least 4 characters without any whitespace(s)');
          done(err);
        });
    });
    it('Should return an error if the user provides no firstname', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('First name is required, It should have no whitespace(s) in between its characters');
          done();
        });
    });
    it('Should return an error if the user provides no lastname', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon',
          lastName: '',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('Last name is required, It should have no whitespace(s) in between its characters');
          done();
        });
    });
    it('Should return an error if firstname has a  whitespace', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'jon y',
          lastName: 'middlename',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('First name is required, It should have no whitespace(s) in between its characters');

          done();
        });
    });
    it('Should return an error if lastname has a  whitespace', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Ferguson',
          lastName: 'middl ename',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('Last name is required, It should have no whitespace(s) in between its characters');
          done();
        });
    });
    it('Should return an error if the user tries to sign up with an existing email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'john',
          lastName: 'joe',
          email: 'fergusoniyara@gmail.com',
          password: 'simplepassword',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal(409);
          expect(res.body.message).to.be.equal('Email Already exists');
          done();
        });
    });
  });
  describe('POST api/v2/auth/signup', () => {
    it('Should return an error if the user provides an invalid email', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'wrongmailaddress',
          password: 'simpleandweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Your Email is required, example fergusoniyara@banka.com');
          done();
        });
    });
    it('Should return an error if the user provides no firstname', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstName: '',
          lastName: 'bellion',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('First name is required, It should have no whitespace(s) in between its characters');
          done();
        });
    });
    it('Should return an error if the user provides no lastname', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstName: 'jon',
          lastName: '',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Last name is required, It should have no whitespace(s) in between its characters');
          done();
        });
    });
    it('Should return an error if firstname has a  whitespace', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstName: 'jon y',
          lastName: 'middlename',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('First name is required, It should have no whitespace(s) in between its characters');

          done();
        });
    });
    it('Should return an error if lastname has a  whitespace', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstName: 'Ferguson',
          lastName: 'middl ename',
          email: 'jon@gmail.com',
          password: 'simpleandsweet',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Last name is required, It should have no whitespace(s) in between its characters');
          done();
        });
    });
    it('Should return an error if the user tries to sign up with an existing email', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          firstName: 'john',
          lastName: 'joe',
          email: 'mamasssboy@gmail.com',
          password: 'simplepassword',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal(409);
          expect(res.body.error).to.be.equal('Email Already Exists');
          done();
        });
    });
  });
  describe('POST api/v1/auth/signin', () => {
    it('Should successfully log in a user and return a token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          firstName: 'jon',
          lastName: 'bellion',
          email: 'fergusoniyara@gmail.com',
          password: 'somepassword',
          type: 'client',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data).to.have.key('id', 'token', 'firstName', 'lastName', 'email');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if the user provides wrong login credentials', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'wrong@gmail.com',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.be.equal(409);
          expect(res.body.message).to.be.equal('Email or password invalid');
          done();
        });
    });
  });
  describe('POST api/v2/auth/signin', () => {
    it('Should successfully log in a user and return a token', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'fegor@gmail.com',
          password: 'somepassword1',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data).to.have.key('id', 'token', 'firstName', 'lastName', 'email');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });
    it('Should return an error if the user provides wrong email address', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'wrolhjhiuyng@gmail.com',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body.error).to.be.equal('Email does not exist');
          done();
        });
    });
    it('Should return an error if the user provides no email address', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          password: 'wrongpassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Your email is required, example fergusoniyara@banka.com');
          done();
        });
    });
    it('Should return an error if the user provides no password', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'fergie@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.error).to.be.equal('Password should be at least 4 characters without any whitespace(s)');
          done();
        });
    });
    it('Should return an error if the user provides wrong password', (done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'fegor@gmail.com',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          expect(res.body.status).to.be.equal(401);
          expect(res.body.error).to.be.equal('Email or Password Incorrect');
          done();
        });
    });
  });
});


describe('Test for User Endpoint', () => {
  describe('GET api/v2/user/<user-email-address>/accounts', () => {
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
    it('Should return an error if client wants to get a list of all accounts belonging to a user', (done) => {
      const email = 'fereoomee@gmail.com';
      chai
        .request(app)
        .get(`/api/v2/user/${email}/accounts`)
        .set('x-access-token', UserToken)
        .end((err, res) => {
          expect(res.body.status).to.be.equals(401);
          expect(res.body.error).to.be.equals('You do not have the rights to this resource');
          done();
        });
    });
  });
});

describe('Test for User Endpoint', () => {
  describe('GET api/v2/user/<user-email-address>/accounts', () => {
    before((done) => {
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
    it('Should return an error if the email is not found', (done) => {
      const email = 'mariana@gmail.com';
      chai
        .request(app)
        .get(`/api/v2/user/${email}/accounts`)
        .set('x-access-token', cashierToken)
        .end((err, res) => {
          expect(res.body.status).to.be.equals(404);
          expect(res.body.error).to.be.equals('Email does not exist');
          done();
        });
    });
    it('Should return a list of all accounts belonging to a user', (done) => {
      const email = 'fereoomee@gmail.com';
      chai
        .request(app)
        .get(`/api/v2/user/${email}/accounts`)
        .set('x-access-token', cashierToken)
        .end((err, res) => {
          expect(res.body.status).to.be.equals(200);
          expect(res.body.accounts).to.be.an('array');
          done();
        });
    });
  });
});

describe('Test for password reset endpoint', () => {
  describe('GET api/v2/auth/<email-address>', () => {
    it('Should return an error if the email does not exist', (done) => {
      const email = 'mariana@gmail.com';
      chai
        .request(app)
        .post(`/api/v2/auth/${email}`)
        .send({ password: 'Password@2018' })
        .end((err, res) => {
          expect(res.body.status).to.be.equals(404);
          expect(res.body.error).to.be.equals('Email does not exist');
          done();
        });
    });
    it('Should successfully reset a user password and send a mail', (done) => {
      const email = 'fergusoniyara@gmail.com';
      chai
        .request(app)
        .post(`/api/v2/auth/${email}`)
        .send({ password: 'Password@2018' })
        .end((err, res) => {
          expect(res.body.status).to.be.equals(200);
          expect(res.body.data).to.be.equals('message sent');
          done();
        });
    });
  });
});


// Test that handles non-existent routes
describe('GET *', () => {
  it('Should throw a 404 error', (done) => {
    chai
      .request(app)
      .get('/account/number/try')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.equals('The specified route does not exist');
        done();
      });
  });
});
