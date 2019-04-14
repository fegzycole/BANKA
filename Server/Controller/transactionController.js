import testData from '../data/testData';

const { transaction, accounts } = testData;

class TransactionController {
  static creditAccount(req, res) {
    // search if account number exists
    try {
      const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
      if (!account) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
          message: 'Account not found',
        });
      }
      const { body } = req;
      const acctBal = account.balance;
      const { amountToDeposit } = body;
      // validate whether a number has been put in the body of the request
      if (typeof (amountToDeposit) !== 'number') {
        return res.status(400).json({
          status: 400,
          message: 'Please put in a number to Deposit',
        });
      }
      // continue with the account debit logic
      const newBal = acctBal + amountToDeposit;
      const newTransaction = {
        id: transaction.length + 1,
        type: 'credit',
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

  static debitAccount(req, res) {
    try {
      const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
      if (!account) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
          message: 'Account not found',
        });
      }
      const { body } = req;
      const acctBal = account.balance;
      const { amountToDeposit } = body;
      // validate whether a number has been put in the body of the request
      if (typeof (amountToDeposit) !== 'number') {
        return res.status(400).json({
          status: 400,
          message: 'Please put in a number to Withdraw',
        });
      }
      // continue with the account debit logic
      const newBal = acctBal - amountToDeposit;
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
