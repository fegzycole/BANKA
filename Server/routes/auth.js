/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import userController from '../Controller/userController';

const {
  createUserAccount, login,
} = userController;

const router = express.Router();

router.post('/signup', createUserAccount);

router.post('/signin', login);


export default router;
