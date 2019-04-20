import express from 'express';

import Accountcontroller from '../Controller/accountController';

import helper from '../helper/helper';

const { verifyTokenAccounts, verifyTokenAll } = helper;

const {
  createClientAccountDb,
  activateOrDeactivateDb,
  deleteAnAccountDb,
  getTransactionsHistory,
  getspecificAccount, getAllAccounts,
} = Accountcontroller;


const router = express.Router();

router.post('/', createClientAccountDb);

router.patch('/:accountNo', verifyTokenAccounts, activateOrDeactivateDb);

router.get('/:accountNo/transactions', verifyTokenAll, getTransactionsHistory);

router.get('/', verifyTokenAccounts, getAllAccounts);

router.get('/:accountNo', verifyTokenAll, getspecificAccount);

router.delete('/:accountNo', verifyTokenAccounts, deleteAnAccountDb);


export default router;
