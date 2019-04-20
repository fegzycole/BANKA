/* eslint-disable linebreak-style */
import express from 'express';
import Accountcontroller from '../Controller/accountController';

import helper from '../helper/helper';

const {
  createClientAccount, activateOrDeactivate, deleteAnAccount,
} = Accountcontroller;

const { verifyTokenAccounts } = helper;

const router = express.Router();

router.post('/', createClientAccount);

router.patch('/:accountNo', verifyTokenAccounts, activateOrDeactivate);

router.delete('/:accountNo', verifyTokenAccounts, deleteAnAccount);

export default router;
