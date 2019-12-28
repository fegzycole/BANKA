// import express from 'express';
// import Accountcontroller from '../Controller/accountController';
// import helper from '../helper/helper';
// import Service from '../services/service';
// import Validator from '../Middleware/validator';
// const { verifyTokenAll, validateAccountType } = helper;
// const { checkAccountNo, validateStatus } = Validator;
// const {
//   createBankAccount,
//   changeStatus,
//   deleteAccount,
//   getTransactionsHistory,
//   getspecificAccount, getAllAccounts,
// } = Accountcontroller;
// const { staffToken } = Service;
// const router = express.Router();
// router.post('/', verifyTokenAll, validateAccountType, createBankAccount);
// router.patch('/:accountNo', verifyTokenAll, staffToken, checkAccountNo, validateStatus, changeStatus);
// router.get('/:accountNo/transactions', verifyTokenAll, checkAccountNo, getTransactionsHistory);
// router.get('/', verifyTokenAll, staffToken, getAllAccounts);
// router.get('/:accountNo', verifyTokenAll, checkAccountNo, getspecificAccount);
// router.delete('/:accountNo', verifyTokenAll, staffToken, checkAccountNo, deleteAccount);
// export default router;
"use strict";