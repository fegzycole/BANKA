// /* eslint-disable linebreak-style */
import express from 'express';
import {
  cashTransaction,
  getATransaction,
  getAnAccountsTransactions
} from '../Controller/transaction';
import { validateCashTransaction } from '../Middleware/Validations';
import { 
  authorizeUser,
  confirmCashier,
  confirmCashAvailability,
  checkAccountNumber,
  checkTransactionId,
  confirmOwner,
  confirmStaff
} from '../Middleware/Auth';

const router = express.Router();

router.post(
  '/:accountNumber/transaction',
  authorizeUser,
  confirmCashier,
  validateCashTransaction,
  checkAccountNumber,
  confirmCashAvailability,
  cashTransaction);


router.get(
  '/:id',
  authorizeUser,
  confirmStaff,
  checkTransactionId,
  getATransaction);


router.get(
  '/:accountNumber/all',
  authorizeUser,
  checkAccountNumber,
  confirmOwner,
  getAnAccountsTransactions)
export default router;
