/* eslint-disable linebreak-style */
import express from 'express';

import TransactionController from '../Controller/transactionController';

import helper from '../helper/helper';


const { creditAccount, debitAccount } = TransactionController;

const { verifyTokenTransactions } = helper;


const router = express.Router();

router.post('/:accountNo/credit', verifyTokenTransactions, creditAccount);

router.post('/:accountNo/debit', verifyTokenTransactions, debitAccount);


export default router;
