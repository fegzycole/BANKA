import {
  generateAccountNumber,
  errResponse,
  successResponse,
} from '../helper/helper';

import models from '../models';

const { Account } = models;

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

export const editAccountStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const account = req.account;
    await account.update({ status });
    const { dataValues } = account;
    return successResponse(res, 200, dataValues);
  } catch (error) {
    return errResponse(res, 500, error.message);
  };
}

export const deleteAccount = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;
    const account = req.account;
    await account.destroy({ accountNumber });
    return successResponse(res, 200, 'Bank account successfully deleted');
  } catch (error) {
    return errResponse(res, 500, error.message);
  };
}

export const getAnAccount = async (req, res, next) => {
  try {
    const account = req.account;
    return successResponse(res, 200, account.dataValues);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
}
