import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {
  errResponse,
  comparePassword,
  userExists,
  accountExists,
  transactionIdExists,
} from '../helper/helper';

config();

export const checkExistingUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userExists(email);
    if (user) {
      return errResponse(res, 409, 'Email already exists!');
    }
    req.user = req.body;
    return next();
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const checkUserEmail = async (req, res, next) => {
  try {
    let user;

    if (req.body.email) {
      user = await userExists(req.body.email);
    } else {
      user = await userExists(req.params.email);
    }

    if (!user) {
      return errResponse(res, 404, 'User not found');
    }
    req.user = user;
    return next();
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const compareUserPassword = (req, res, next) => {
  const passwordInDb = req.user.password;
  const passwordInRequest = req.body.password;
  const passwordMatches = comparePassword(passwordInDb, passwordInRequest);
  if (!passwordMatches) {
    return errResponse(res, 401, 'Authentication Failed, Email or Password Incorrect');
  }
  req.user = req.user.getSafeDataValues();
  return next();
};

export const authorizeUser = (req, res, next) => {
  try {
    if (!req.headers['x-access-token']
    && !req.headers.token && (!req.headers.authorization)
    && (!req.body.token) && (!req.body.Authorization)) { throw new Error('You do not have access to this resource'); }
    const token = req.body.token
    || req.headers['x-access-token']
    || req.headers.token
    || req.headers.authorization
    || req.body.token
    || req.body.Authorization;
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    return next();
  } catch (error) {
    return errResponse(res, 401, error.message);
  }
};

export const checkUserAccountType = (req, res, next) => {
  const { type } = req.decoded;
  if (type !== 'customer') {
    return errResponse(res, 403, 'only a customer can create an account');
  }
  return next();
};


export const confirmAdmin = (req, res, next) => {
  const { type } = req.decoded;
  if (type !== 'admin') {
    return errResponse(res, 403, 'only an admin can change the status of an account');
  }
  return next();
};

export const confirmCashier = (req, res, next) => {
  const { type } = req.decoded;
  if (type !== 'cashier') {
    return errResponse(res, 403, 'only a cashier can perform cash transactions');
  }
  return next();
};

export const confirmCashAvailability = (req, res, next) => {
  const { balance } = req.account;
  const { type, amount } = req.body;
  if (type === 'debit' && balance - amount < 0) {
    return errResponse(res, 400, 'Insufficient funds!');
  }
  return next();
};

export const checkAccountNumber = async (req, res, next) => {
  const { accountNumber } = req.params;
  const account = await accountExists(Number(accountNumber));
  if (!account) {
    return errResponse(res, 404, 'Account not found');
  }
  req.account = account;
  return next();
};

export const confirmOwner = async (req, res, next) => {
  const { dataValues } = req.account;
  const { owner } = dataValues;
  const { id, type } = req.decoded;
  const validTypes = ['admin', 'cashier'];
  if (!validTypes.includes(type) && owner !== id) {
    return errResponse(res, 403, 'You do not have the rights to this resource');
  }
  return next();
};

export const confirmStaff = async (req, res, next) => {
  const { type } = req.decoded;
  const validTypes = ['admin', 'cashier'];
  if (!validTypes.includes(type)) {
    return errResponse(res, 403, 'You do not have the rights to this resource');
  }
  return next();
};


export const checkTransactionId = async (req, res, next) => {
  const { id } = req.params;
  const transaction = await transactionIdExists(Number(id));
  if (!transaction) {
    return errResponse(res, 404, 'Transaction not found');
  }
  req.transaction = transaction;
  return next();
};
