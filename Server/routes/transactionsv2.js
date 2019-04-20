import express from 'express';

import TransactionController from '../Controller/transactionController';

import helper from '../helper/helper';

const { cashTransactionsDb } = TransactionController;

const { verifyTokenTransactions } = helper;

const router = express.Router();

router.post('/:accountNo/credit', verifyTokenTransactions, cashTransactionsDb);

export default router;
