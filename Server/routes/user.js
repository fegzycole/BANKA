import express from 'express';
import userController from '../Controller/userController';
import Validator from '../Middleware/validator';
import Helper from '../helper/helper';

const { verifyTokenAll } = Helper;

const { checkExistingEmail } = Validator;

const router = express.Router();

const { getUserAccounts, getUserAccountsJoin } = userController;

router.get('/:email/accounts', verifyTokenAll, checkExistingEmail, getUserAccounts);

router.get('/:email/transactions', verifyTokenAll, checkExistingEmail, getUserAccountsJoin);

export default router;
