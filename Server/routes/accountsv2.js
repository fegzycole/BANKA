import express from 'express';

import Accountcontroller from '../Controller/accountController';

import helper from '../helper/helper';

import Service from '../Services/service';

import Validator from '../Middleware/validator';

const { verifyTokenAll, validateAccountType } = helper;

const { checkAccountNo, validateStatus } = Validator;

const {
  createClientAccountDb,
  activateOrDeactivateDb,
  deleteAnAccountDb,
  getTransactionsHistory,
  getspecificAccount, getAllAccounts,
} = Accountcontroller;

const { staffToken } = Service;


const router = express.Router();

router.post('/', verifyTokenAll, validateAccountType, createClientAccountDb);

router.patch('/:accountNo', verifyTokenAll, staffToken, checkAccountNo, validateStatus, activateOrDeactivateDb);

router.get('/:accountNo/transactions', verifyTokenAll, checkAccountNo, getTransactionsHistory);

router.get('/', verifyTokenAll, staffToken, getAllAccounts);

router.get('/:accountNo', verifyTokenAll, checkAccountNo, getspecificAccount);

router.delete('/:accountNo', verifyTokenAll, staffToken, checkAccountNo, deleteAnAccountDb);


export default router;
