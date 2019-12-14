// import express from 'express';
// import userController from '../Controller/userController';
// import Validator from '../Middleware/validator';
// import Helper from '../helper/helper';

// const { verifyTokenAll } = Helper;

// const { checkExistingEmail, checkAccountNo } = Validator;

// const router = express.Router();

// const { getUserAccounts, getUserAccountsJoin, getAccountsByAccountNumber } = userController;

// router.get('/:email/accounts', verifyTokenAll, checkExistingEmail, getUserAccounts);

// router.get('/:email/transactions', verifyTokenAll, checkExistingEmail, getUserAccountsJoin);

// router.get('/:accountNo/transactions/accounts', verifyTokenAll, checkAccountNo, getAccountsByAccountNumber);

// export default router;
