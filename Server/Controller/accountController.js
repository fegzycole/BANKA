/* eslint-disable radix */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import helper from '../helper/helper';
import Validator from '../Middleware/validator';
import testData from '../data/testData';

const { accounts } = testData;

const { validateCreateAccount } = Validator;

const { createAccountNumber } = helper;

class AccountController {
  static createClientAccount(req, res) {
    // Decode the client's token
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'superSecret', (err, decoded) => {
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
    res.json({
      status: 200,
      data: account,
    });
  }

  static activateOrDeactivate(req, res) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'superSecret', (err, decoded) => {
        if (err) {
          return res.status(404).json({
            status: 404,
            message: err,
          });
        }
        req.decoded = decoded;
      });
    }
    if (req.decoded.isStaff === false) {
      return res.json({
        status: 401,
        error: 'You do not have the rights to this resource',
        message: 'Request denied',
      });
    }
    const account = accounts.find(c => c.accountNo === parseInt(req.params.accountNo));
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
        message: 'Account not found',
      });
    }

    if (account.status === 'active') {
      account.status = 'dormant';
    } else {
      account.status = 'active';
    }
    accounts.push(account);
    res.json({
      status: 200,
      data: {
        accountNo: account.accountNo,
        status: account.status,
      },
    });
  }
}

export default AccountController;
