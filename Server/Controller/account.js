import {
  generateAccountNumber,
  errResponse,
  successResponse,
} from '../helper/helper';

import models from '../models';

const { Account, Transaction } = models;

export const createAccount = async (req, res) => {
  try {
    const { id } = req.decoded;
    const { type } = req.body;
    const accountNumber = await generateAccountNumber();
    const newAccount = {
      owner: id,
      status: 'draft',
      balance: parseFloat(0.00),
      type,
      accountNumber,
    };
    const { dataValues } = await Account.create(newAccount);
    return successResponse(res, 201, dataValues);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const editAccountStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { account } = req;
    await account.update({ status });
    const { dataValues } = account;
    return successResponse(res, 200, dataValues);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const { account } = req;
    await account.destroy({ accountNumber });
    return successResponse(res, 200, 'Bank account successfully deleted');
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const getAnAccount = async (req, res) => {
  try {
    const { account } = req;
    const { dataValues } = account;
    dataValues.balance = Number(parseFloat(dataValues.balance));
    return successResponse(res, 200, dataValues);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    accounts.forEach((account) => {
      const { dataValues } = account;
      dataValues.balance = Number(parseFloat(dataValues.balance));
    });

    return successResponse(res, 200, accounts);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const getUserAccounts = async (req, res) => {
  try {
    const { id } = req.params;
    const accounts = await Account.findAll({
      where: { owner: id },
      include: [{
        model: Transaction,
        as: 'transactions',
      }],
    });
    accounts.forEach((account) => {
      const { dataValues } = account;
      dataValues.balance = Number(parseFloat(dataValues.balance));
    });

    return successResponse(res, 200, accounts);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};
