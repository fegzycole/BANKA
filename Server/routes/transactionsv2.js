// import express from 'express';

// import TransactionController from '../Controller/transactionController';

// import helper from '../helper/helper';

// import Service from '../services/service';

// import Validator from '../Middleware/validator';


// const { cashierToken } = Service;

// const { cashTransactions, getspecificTransaction } = TransactionController;

// const { verifyTokenAll, validatePath } = helper;

// const { checkAccountNo, checkId, validateTransaction } = Validator;

// const router = express.Router();

// router.post('/:accountNo/credit', verifyTokenAll, cashierToken, checkAccountNo, validateTransaction, validatePath, cashTransactions);

// router.post('/:accountNo/debit', verifyTokenAll, cashierToken, checkAccountNo, validateTransaction, validatePath, cashTransactions);

// router.get('/:id', verifyTokenAll, checkId, getspecificTransaction);

// export default router;
