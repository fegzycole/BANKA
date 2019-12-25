import express from 'express';
import createAccount from '../Controller/account';
import { validateAccountType } from '../Middleware/Validations';
import { authorizeUser, checkUserAccountType } from '../Middleware/Auth';

const router = express.Router();

router.post('/', 
authorizeUser,
checkUserAccountType,
validateAccountType,
createAccount);

// router.patch('/:accountNo', verifyTokenAll, staffToken, activateOrDeactivate);

// router.delete('/:accountNo', verifyTokenAll, staffToken, deleteAnAccount);

export default router;
