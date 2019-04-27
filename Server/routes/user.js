import express from 'express';
import userController from '../Controller/userController';
import Validator from '../Middleware/validator';
import Helper from '../helper/helper';

const { verifyTokenAll } = Helper;

const { checkExistingEmail } = Validator;

const router = express.Router();

const { getUserAccounts } = userController;

router.get('/:email/accounts', verifyTokenAll, checkExistingEmail, getUserAccounts);

export default router;
