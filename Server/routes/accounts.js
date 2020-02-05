import express from 'express';

import {
  createAccount,
  editAccountStatus,
  deleteAccount,
  getAnAccount,
  getAllAccounts,
  getUserAccounts,
} from '../Controller/account';

import {
  validateAccountType,
  validatestatusChange,
} from '../Middleware/Validations';

import {
  authorizeUser,
  checkUserAccountType,
  confirmAdmin,
  checkAccountNumber,
  confirmStaff,
} from '../Middleware/Auth';

const router = express.Router();

router.post(
  '/',
  authorizeUser,
  checkUserAccountType,
  validateAccountType,
  createAccount,
);

router.patch(
  '/:accountNumber',
  authorizeUser,
  confirmAdmin,
  validatestatusChange,
  checkAccountNumber,
  editAccountStatus,
);

router.delete(
  '/:accountNumber',
  authorizeUser,
  confirmStaff,
  checkAccountNumber,
  deleteAccount,
);

router.get(
  '/:accountNumber',
  authorizeUser,
  checkAccountNumber,
  getAnAccount,
);

router.get(
  '/',
  authorizeUser,
  confirmStaff,
  getAllAccounts,
);

router.get(
  '/:id/all',
  getUserAccounts,
);

// router.delete('/:accountNo', verifyTokenAll, staffToken, deleteAnAccount);

export default router;
