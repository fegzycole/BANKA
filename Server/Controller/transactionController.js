import testData from '../data/testData';
import Db from '../Database/index';

const { transaction, accounts } = testData;

class TransactionController {
  /**
   * Creit Bank Account (V1)
   * @param {*} req
   * @param {*} res
   */
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

  /**
   * Debit Bank Account (V2)
   * @param {*} req
   * @param {*} res
   */
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

  /**
   * Cash Transactions(Debit an Credit) V2
   * @param {*} req
   * @param {*} res
   */
  static async cashTransactionsDb(req, res) {
    // search if account number exists
    try {
      const accountChecker = await Db.query('SELECT * FROM accountstable  WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]);
      if (!accountChecker.rows.length) {
        return res.status(404).json({
          status: 404,
          message: 'Account Not Found',
        });
      }
      const acctBal = accountChecker.rows[0].balance;
      // validate whether a number has been put in the body of the request
      if (typeof (req.body.amountToDeposit) !== 'number') {
        return res.status(400).json({
          status: 400,
          message: 'Please put in a number',
        });
      }
      if (req.body.type !== 'credit' && req.body.type !== 'debit') {
        return res.status(400).json({
          status: 400,
          message: 'Put in a transaction type please',
        });
      }
      // continue with the account credit/debit logic
      let newBal;
      if (req.body.type === 'credit') {
        newBal = parseFloat(acctBal) + parseFloat(req.body.amountToDeposit);
      }
      if (req.body.type === 'debit') {
        newBal = parseFloat(acctBal) - parseFloat(req.body.amountToDeposit);
      }
      const newTransaction = [
        req.body.type,
        parseInt(req.params.accountNo, 10),
        parseFloat(acctBal),
        parseFloat(newBal),
        req.decoded.id,
        req.body.amountToDeposit,
      ];
      await Db.query('UPDATE accountstable SET balance = $1 WHERE accountnumber = $2 returning *', [parseFloat(newBal), parseInt(req.params.accountNo, 10)]);
      // pushes the new account to the DB if it validates
      const queryString = 'INSERT INTO transactions(type, accountnumber, oldbalance, newbalance, cashier, amount, createdon) VALUES($1, $2, $3, $4, $5, $6, NOW()) returning *';
      const { rows } = await Db.query(queryString, newTransaction);
      await Db.query('COMMIT');
      return res.json({
        status: 200,
        data: {
          transactionId: rows[0].id,
          accountNumber: parseInt(rows[0].accountnumber, 10),
          amount: parseFloat(rows[0].amount).toFixed(2),
          cashier: parseInt(rows[0].cashier, 10),
          transactionType: rows[0].type,
          accountBalance: parseFloat(rows[0].newbalance).toFixed(2),
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  /**
   * Get A Specific Transaction(V2)
   * @param {*} req
   * @param {*} res
   */
  static async getspecificTransaction(req, res) {
    try {
      const idChecker = await Db.query('SELECT id, createdon, CAST(accountnumber as INTEGER), type, CAST(oldbalance as FLOAT),CAST(newbalance as FLOAT), CAST(amount as FLOAT) FROM transactions WHERE id = $1', [parseInt(req.params.id, 10)]);
      if (!idChecker.rows.length) {
        return res.status(404).json({
          status: 422,
          error: 'No Transaction with the stated ID',
        });
      }
      return res.json({
        status: 200,
        data: {
          transactionId: idChecker.rows[0].id,
          createdOn: idChecker.rows[0].createdon,
          type: idChecker.rows[0].type,
          accountNumber: idChecker.rows[0].accountnumber,
          amount: idChecker.rows[0].amount,
          oldBalance: idChecker.rows[0].oldbalance,
          newBalance: idChecker.rows[0].newbalance,
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
