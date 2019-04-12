/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
import userController from '../Controller/userController';

const {
  createClientAccount, createCashierAccount, createAdminAccount, login,
} = userController;

const router = express.Router();

router.post('/signup', createClientAccount);


router.post('/createcashier', createCashierAccount);

router.post('/createadmin', createAdminAccount);


router.post('/signin', login);


export default router;
