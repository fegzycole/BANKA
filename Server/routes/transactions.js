/* eslint-disable linebreak-style */
import express from 'express';

import TransactionController from '../Controller/transactionController';

import helper from '../helper/helper';

const { creditAccount } = TransactionController;

const { verifyToken } = helper;

const router = express.Router();

router.post('/:accountNo/credit', verifyToken, creditAccount);

// router.post('/:accountNo/debit', verifyToken, debitAccount);

export default router;
