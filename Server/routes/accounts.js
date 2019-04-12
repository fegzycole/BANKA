/* eslint-disable indent */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
import express from 'express';

import jwt from 'jsonwebtoken';
import AccountController from '../Controller/accountController';

const { createClientAccount } = AccountController;
const router = express.Router();

router.post('/', createClientAccount);

export default router;
