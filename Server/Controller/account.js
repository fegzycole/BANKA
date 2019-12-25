import {
  generateAccountNumber,
  errResponse,
  successResponse,
} from '../helper/helper';

import models from '../models';

const { Account } = models;

const createAccount = async (req, res) => {
  try {
    const { id } = req.decoded;
    const { type } = req.body;
    const accountNumber = generateAccountNumber();
    const newAccount = {
      owner: id,
      status: 'draft',
      openingBal: parseFloat(0.00),
      type,
      accountNumber,
    };
    await Account.create(newAccount);
    return successResponse(res, 201, 'New Account Created');
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export default createAccount;
