/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import testData from '../data/testData';
import Auth from '../Middleware/Auth';
import Helper from '../helper/helper';
import userController from '../Controller/userController';

const { createClientAccount, createCashierAccount, createAdminAccount } = userController;

const { findUserByEmail } = Helper;


const router = express.Router();
const { users } = testData;

router.post('/signup', createClientAccount);


router.post('/createcashier', createCashierAccount);

router.post('/createadmin', createAdminAccount);


router.post('/signin', (req, res) => {
  const userDetails = {
    email: req.body.email.trim(),
    password: req.body.password,
  };

  const existingEmails = users.reduce((emailArray, userDetail) => emailArray.concat(userDetail.email), []);

  if (!existingEmails.includes(userDetails.email)) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication Failed',
      message: 'Request denied',
    });
  }
  const { email, password } = userDetails;
  const userInfo = users.find(user => email === user.email);
  const hash = userInfo.password;
  if (password === hash) {
    const token = Auth.createToken(userInfo);
    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: userInfo.id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
      },
    });
  }

  return res.json({
    status: 401,
    error: 'Authentication Failed. Incorrect Password',
    message: 'Request denied',
  });
});
export default router;
