import express from 'express';

import TransactionController from '../Controller/transactionController';

import helper from '../helper/helper';

import Service from '../Services/service';

import Validator from '../Middleware/validator';


const { cashierToken } = Service;

const { cashTransactions, getspecificTransaction } = TransactionController;

const { verifyTokenAll, validateTransactionDetails } = helper;

const { checkAccountNo, checkId } = Validator;

const router = express.Router();

router.post('/:accountNo/credit', verifyTokenAll, cashierToken, checkAccountNo, validateTransactionDetails, cashTransactions);

router.post('/:accountNo/debit', verifyTokenAll, cashierToken, checkAccountNo, validateTransactionDetails, cashTransactions);

router.get('/:id', verifyTokenAll, checkId, getspecificTransaction);

export default router;
