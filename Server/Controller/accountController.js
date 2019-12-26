import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helper from '../helper/helper';

dotenv.config();

const { accounts } = testData;

const { validateCreateAccount, validateStatusInput } = Validator;

const { createAccountNumber, createAccountNumberDb } = helper;

class AccountController {
  /**
   * Get all Transactions for an account(V2)
   * @param {*} req
   * @param {*} res
   */
  static async getTransactionsHistory(req, res) {
    try {
      const select = await Db.query('SELECT id, CAST(createdon as DATE), type, CAST(accountnumber as INTEGER), CAST(amount as FLOAT), CAST(oldbalance as FLOAT), CAST(newbalance as FLOAT) FROM transactions WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]);
      return res.json({
        status: 200,
        data: select.rows,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  /**
   * Get an account's details(V2)
   * @param {*} req
   * @param {*} res
   */
  static async getspecificAccount(req, res) {
    try {
      const getOwner = await Db.query('SELECT createdon, CAST(accountnumber as INTEGER), type, status, CAST(balance as FLOAT), owner FROM accountstable WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]);
      const getOwnerEmail = await Db.query('SELECT email FROM userstable WHERE id = $1', [parseInt(getOwner.rows[0].owner, 10)]);
      const balance = Number(getOwner.rows[0].balance).toFixed(2);
      return res.json({
        status: 200,
        data: {
          createdOn: getOwner.rows[0].createdon,
          accountNumber: parseInt(req.params.accountNo, 10),
          ownerEmail: getOwnerEmail.rows[0].email,
          type: getOwner.rows[0].type,
          status: getOwner.rows[0].status,
          balance: parseFloat(balance),
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
   * Get all bank accounts(V2)
   * @param {*} req
   * @param {*} res
   */
  static async getAllAccounts(req, res) {
    try {
      if (req.query.status === 'active') {
        const { rows } = await Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id WHERE status = $1', ['active']);
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      }
      if (req.query.status === 'dormant') {
        const { rows } = await Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id WHERE status = $1', ['dormant']);
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      }
      const { rows } = await Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id');
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return error;
    }
  }
}
export default AccountController;
