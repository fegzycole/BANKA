import {
  errResponse,
  successResponse,
} from '../helper/helper';

import models from '../models';

const { Transaction } = models;

export const cashTransaction = async (req, res, next) => {
  const { amount, type } = req.body;
  const { id } = req.decoded;
  const account = req.account;
  let { balance, accountNumber } = account;
  let newBalance;
  try {
    type === 'credit' ? (newBalance = Number(parseFloat(balance + amount))) :
    (newBalance = Number(parseFloat(balance - amount)));
    await account.update({ balance: newBalance });
    const transactionData = {
      amount,
      type,
      accountNumber,
      oldBalance: balance,
      newBalance,
      cashier: id
    };
    const { dataValues } = await Transaction.create(transactionData);
    return successResponse(res, 201, dataValues);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
}

export const getATransaction = async (req, res, next) => {
  try {
    const transaction = req.transaction;
    const { dataValues } = transaction;
    dataValues.oldBalance = Number(parseFloat(dataValues.oldBalance));
    dataValues.newBalance = Number(parseFloat(dataValues.newBalance));
    dataValues.amount = Number(parseFloat(dataValues.amount));
    return successResponse(res, 200, dataValues);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
}

export const getAnAccountsTransactions = async (req, res, next) => {
  try {
    const { page, limit, q } = req.query;
    if ((page && limit) || q) {
      return next();
    }
    const { accountNumber } = req.params;
    const transactions = await Transaction.findAll({ where: { accountNumber } });
    transactions.forEach((transaction) => {
      const { dataValues } = transaction;
      dataValues.oldBalance = Number(parseFloat(dataValues.oldBalance));
      dataValues.newBalance = Number(parseFloat(dataValues.newBalance));
      dataValues.amount = Number(parseFloat(dataValues.amount));
    })
    return successResponse(res, 200, transactions);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
}
