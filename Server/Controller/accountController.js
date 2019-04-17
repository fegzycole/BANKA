/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helper from '../helper/helper';
import Validator from '../Middleware/validator';
import testData from '../data/testData';

dotenv.config();

const { accounts } = testData;

const { validateCreateAccount, validateStatusInput } = Validator;

const { createAccountNumber } = helper;

class AccountController {
  static createClientAccount(req, res) {
    try {
    // Decode the client's token
      const token = req.body.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
          // return an error if it fails to decode
            return res.status(404).json({
              status: 404,
              message: err,
            });
          }
          req.decoded = decoded;
        });
      }
      const openingBal = parseFloat(0.00);

      const accountNumber = createAccountNumber();

      const accountNo = accountNumber;

      const account = {
        accountNo,
        firstName: req.decoded.user.firstName,
        lastName: req.decoded.user.lastName,
        email: req.decoded.user.email,
        owner: req.decoded.user.id,
        type: req.body.type,
        status: 'draft',
        openingBal,
      };

      const { error } = validateCreateAccount(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }
      // pushes the new account to the DB if it validates
      accounts.push(account);
      return res.json({
        status: 200,
        data: account,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static activateOrDeactivate(req, res) {
    try {
      const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
      if (!account) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
          message: 'Account not found',
        });
      }
      const user = {
        status: req.body.status,
      };
      const { error } = validateStatusInput(req.body);

      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }
      return res.json({
        status: 200,
        data: {
          accountNo: account.accountNo,
          status: user.status,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static deleteAnAccount(req, res) {
    try {
      const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo, 10));
      if (!account) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
          message: 'Account not found',
        });
      }

      const index = accounts.indexOf(account);
      accounts.splice(index, 1);
      return res.json({
        status: 200,
        message: 'Account deleted successfully',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }
}


export default AccountController;
