import express from 'express';
import userController from '../Controller/userController';
import Validator from '../Middleware/validator';
import Helper from '../helper/helper';

const { verifyTokenAll } = Helper;

const { checkEmails } = Validator;

const router = express.Router();

const { getUserAccounts } = userController;

router.get('/:email/accounts', verifyTokenAll, checkEmails, getUserAccounts);

export default router;
