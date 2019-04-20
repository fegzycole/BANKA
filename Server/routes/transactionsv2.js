import express from 'express';

import TransactionController from '../Controller/transactionController';

import helper from '../helper/helper';

const { cashTransactionsDb, getspecificTransaction } = TransactionController;

const { verifyTokenTransactions, verifyTokenAll } = helper;

const router = express.Router();

router.post('/:accountNo/credit', verifyTokenTransactions, cashTransactionsDb);

router.post('/:accountNo/debit', verifyTokenTransactions, cashTransactionsDb);

router.get('/:id', verifyTokenAll, getspecificTransaction);

export default router;
