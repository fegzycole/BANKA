/* eslint-disable class-methods-use-this */
/* eslint-disable curly */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import express from 'express';
import jwt from 'jsonwebtoken';
import testData from '../data/testData';

const { transaction, accounts } = testData;

class TransactionController {
  static creditAccount(req, res) {
    // search if account numbee exists
    try {
      const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo));
      if (!account) return res.status(404).json({
        status: 404,
        error: 'Account not found',
        message: 'Account not found',
      });
      const { body } = req;
      const acctBal = account.balance;
      const { amountToDeposit } = body;

      const newBal = acctBal + amountToDeposit;
      const newTransaction = {
        id: transaction.length + 1,
        type: 'debit',
        balance: newBal,
        cashier: req.decoded.id,
        amount: req.body.amountToDeposit,
      };
      transaction.push(newTransaction);
      return res.json({
        status: 200,
        data: {
          transactionId: newTransaction.id,
          accountNumber: JSON.stringify(account.accountNo),
          amount: newTransaction.amount,
          cashier: newTransaction.cashier,
          transactionType: newTransaction.type,
          accountBalance: newTransaction.balance,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }
}

export default TransactionController;