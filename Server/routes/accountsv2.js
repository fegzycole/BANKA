import express from 'express';

import Accountcontroller from '../Controller/accountController';

import helper from '../helper/helper';

const { verifyTokenAccounts, verifyTokenAll } = helper;

const {
  createClientAccountDb, activateOrDeactivateDb, deleteAnAccountDb, getTransactionsHistory,
} = Accountcontroller;


const router = express.Router();

router.post('/', createClientAccountDb);

router.patch('/:accountNo', verifyTokenAccounts, activateOrDeactivateDb);

router.get('/:accountNo/transactions', verifyTokenAll, getTransactionsHistory);

router.delete('/:accountNo', verifyTokenAccounts, deleteAnAccountDb);

export default router;
