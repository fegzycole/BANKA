import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

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
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body.data).to.have.key('id', 'token', 'firstName', 'lastName', 'email');
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
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('First Name is required');
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
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal(400);
          expect(res.body.message).to.be.equal('Last Name is required');
          done();
        });
    });
    // it('Should return an error if the user name with whitespace', done => {
    //   chai
    //     .request(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       firstName: 'jon bellion',
    //       lastName: 'middlename',
    //       email: 'jon@gmail.com',
    //       password: 'simpleandsweet'
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(422);
    //       expect(res.body.status).to.be.equal(422);
    //       expect(res.body.error).to.be.equal('Invalid firstname/lastname provided');
    //       expect(res.body.message).to.be.equal('No spaces are allowed in the firstname/lastname');

    //       done();
    //     });
    // });
    // it('Should return an error if the user tries to sign up with an existing email', done => {
    //   chai
    //     .request(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       firstName: 'john',
    //       lastName: 'joe',
    //       email: 'jon@gmail.com',
    //       password: 'simpleandsweet'
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(409);
    //       expect(res.body.status).to.be.equal(409);
    //       expect(res.body.error).to.be.equal('Email already in use');
    //       done();
    //     });
    // });
  });
  // describe('POST api/v1/auth/login', () => {
  //   it('Should successfully log in a user and return a token', done => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'jon@gmail.com',
  //         password: 'simpleandweet'
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body.status).to.be.equal(200);
  //         expect(res.body.data[0]).to.have.key('token');
  //         expect(res.body.data[0].token).to.be.a('string');
  //         done();
  //       });
  //   });

  //   it('Should return an error if the user provides wrong login credentials', done => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'wrong@gmail.com',
  //         password: 'wrongpassword'
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(401);
  //         expect(res.body.status).to.be.equal(401);
  //         expect(res.body.error).to.be.equal('Authentication Failed');
  //         done();
  //       });
  //   });
  // });
});
