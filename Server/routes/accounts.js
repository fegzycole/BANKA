import express from 'express';
import { 
  createAccount,
  editAccountStatus,
  deleteAccount,
  getAnAccount
} from '../Controller/account';
import { validateAccountType, validatestatusChange } from '../Middleware/Validations';
import { 
  authorizeUser,
  checkUserAccountType,
  confirmAdmin,
  checkAccountNumber,
} from '../Middleware/Auth';

const router = express.Router();

router.post(
  '/',
  authorizeUser,
  checkUserAccountType,
  validateAccountType,
  createAccount
);

router.patch(
  '/:accountNumber',
  authorizeUser,
  confirmAdmin,
  validatestatusChange,
  checkAccountNumber,
  editAccountStatus
);

router.delete(
  '/:accountNumber',
  authorizeUser,
  confirmAdmin,
  checkAccountNumber,
  deleteAccount
);

router.get(
  '/:accountNumber',
  authorizeUser,
  checkAccountNumber,
  getAnAccount
)

// router.delete('/:accountNo', verifyTokenAll, staffToken, deleteAnAccount);

export default router;
