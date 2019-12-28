// import testData from '../data/testData';
// import Db from '../Database/index';
// const { transaction, accounts } = testData;
// class TransactionController {
//   /**
//    * Creit Bank Account (V1)
//    * @param {*} req
//    * @param {*} res
//    */
//   static creditAccount(req, res) {
//     // search if account number exists
//     try {
//       const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
//       if (!account) {
//         return res.status(404).json({
//           status: 404,
//           error: 'Account not found',
//           message: 'Account not found',
//         });
//       }
//       const { body } = req;
//       const acctBal = account.balance;
//       const { amountToDeposit } = body;
//       // validate whether a number has been put in the body of the request
//       if (typeof (amountToDeposit) !== 'number') {
//         return res.status(400).json({
//           status: 400,
//           message: 'Please put in a number to Deposit',
//         });
//       }
//       // continue with the account debit logic
//       const newBal = acctBal + amountToDeposit;
//       const newTransaction = {
//         id: transaction.length + 1,
//         type: 'credit',
//         balance: newBal,
//         cashier: req.decoded.id,
//         amount: req.body.amountToDeposit,
//       };
//       transaction.push(newTransaction);
//       return res.json({
//         status: 200,
//         data: {
//           transactionId: newTransaction.id,
//           accountNumber: JSON.stringify(account.accountNo),
//           amount: newTransaction.amount,
//           cashier: newTransaction.cashier,
//           transactionType: newTransaction.type,
//           accountBalance: newTransaction.balance,
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }
//   /**
//    * Debit Bank Account (V2)
//    * @param {*} req
//    * @param {*} res
//    */
//   static debitAccount(req, res) {
//     try {
//       const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
//       if (!account) {
//         return res.status(404).json({
//           status: 404,
//           error: 'Account not found',
//           message: 'Account not found',
//         });
//       }
//       const { body } = req;
//       const acctBal = account.balance;
//       const { amountToDeposit } = body;
//       // validate whether a number has been put in the body of the request
//       if (typeof (amountToDeposit) !== 'number') {
//         return res.status(400).json({
//           status: 400,
//           message: 'Please put in a number to Withdraw',
//         });
//       }
//       // continue with the account debit logic
//       const newBal = acctBal - amountToDeposit;
//       const newTransaction = {
//         id: transaction.length + 1,
//         type: 'debit',
//         balance: newBal,
//         cashier: req.decoded.id,
//         amount: req.body.amountToDeposit,
//       };
//       transaction.push(newTransaction);
//       return res.json({
//         status: 200,
//         data: {
//           transactionId: newTransaction.id,
//           accountNumber: JSON.stringify(account.accountNo),
//           amount: newTransaction.amount,
//           cashier: newTransaction.cashier,
//           transactionType: newTransaction.type,
//           accountBalance: newTransaction.balance,
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }
//   /**
//    * Cash Transactions(Debit an Credit) V2
//    * @param {*} req
//    * @param {*} res
//    */
//   static async cashTransactions(req, res) {
//     try {
//       const accountChecker = await Db.query('SELECT * FROM accountstable  WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]);
//       const acctBal = parseFloat(accountChecker.rows[0].balance);
//       let newBal;
//       if (req.route.path === '/:accountNo/credit') {
//         newBal = parseFloat(acctBal) + parseFloat(req.body.amountToDeposit);
//       }
//       if (req.route.path === '/:accountNo/debit') {
//         if (acctBal <= req.body.amountToDeposit) {
//           return res.json({
//             status: 400,
//             error: 'Insufficient Funds',
//           });
//         }
//         newBal = parseFloat(acctBal) - parseFloat(req.body.amountToDeposit);
//       }
//       const newTransaction = [
//         req.body.type,
//         parseInt(req.params.accountNo, 10),
//         parseFloat(acctBal),
//         parseFloat(newBal),
//         req.decoded.user.id,
//         req.body.amountToDeposit,
//       ];
//       await Db.query('UPDATE accountstable SET balance = $1 WHERE accountnumber = $2 returning *', [parseFloat(newBal), parseInt(req.params.accountNo, 10)]);
//       // pushes the new account to the DB if it validates
//       const queryString = 'INSERT INTO transactions(type, accountnumber, oldbalance, newbalance, cashier, amount, createdon) VALUES($1, $2, $3, $4, $5, $6, NOW()) returning *';
//       const { rows } = await Db.query(queryString, newTransaction);
//       await Db.query('COMMIT');
//       const amount = Number(rows[0].amount).toFixed(2);
//       return res.json({
//         status: 200,
//         data: {
//           transactionId: rows[0].id,
//           accountNumber: rows[0].accountnumber,
//           amount: parseFloat(amount),
//           cashier: parseInt(rows[0].cashier, 10),
//           transactionType: rows[0].type,
//           accountBalance: parseFloat(rows[0].newbalance).toFixed(2),
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }
//   /**
//    * Get A Specific Transaction(V2)
//    * @param {*} req
//    * @param {*} res
//    */
//   static async getspecificTransaction(req, res) {
//     try {
//       const idChecker = await Db.query('SELECT id, createdon, CAST(accountnumber as INTEGER), type, CAST(oldbalance as FLOAT),CAST(newbalance as FLOAT), CAST(amount as FLOAT) FROM transactions WHERE id = $1', [parseInt(req.params.id, 10)]);
//       const oldBalance = Number(idChecker.rows[0].oldbalance).toFixed(2);
//       const newBalance = Number(idChecker.rows[0].newbalance).toFixed(2);
//       return res.json({
//         status: 200,
//         data: {
//           transactionId: idChecker.rows[0].id,
//           createdOn: idChecker.rows[0].createdon,
//           type: idChecker.rows[0].type,
//           accountNumber: idChecker.rows[0].accountnumber,
//           amount: idChecker.rows[0].amount,
//           oldBalance: parseFloat(oldBalance),
//           newBalance: parseFloat(newBalance),
//         },
//       });
//     } catch (e) {
//       return res.status(500).json({
//         status: 500,
//         error: 'Sorry, something went wrong, try again',
//       });
//     }
//   }
// }
// export default TransactionController;
"use strict";