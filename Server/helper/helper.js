/* eslint-disable no-return-await */
import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Validator from 'validatorjs';
import models from '../models/index';

const { User, Account, Transaction } = models;

dotenv.config();

export const generateToken = (
  payload,
  secretKey = process.env.SECRET,
  duration = { expiresIn: '24hrs' },
) => jwt.sign(payload, secretKey, duration);

export const errResponse = (res, statusCode, errors) => res.status(statusCode).json({
  status: 'error',
  errors,
});

export const successResponse = (res, statusCode, data) => res.status(statusCode).json({
  status: 'success',
  data,
});

export const validate = (data, rules, res, next) => {
  const validation = new Validator(data, rules);

  if (validation.fails()) {
    return errResponse(res, 400, validation.errors.all());
  }

  return next();
};

export const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);

export const generateAccountNumber = async () => {
  const queryResult = await Account.findAll({
    attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxId']],
  });

  let { maxId } = queryResult[0].dataValues;

  maxId = (maxId === null) ? (1000000000) : (1000000100 + maxId);

  return maxId;
};

export const userExists = async (email) => await User.findOne({ where: { email } });

// eslint-disable-next-line max-len
export const accountExists = async (accountNumber) => await Account.findOne({ where: { accountNumber } });

export const transactionIdExists = async (id) => await Transaction.findOne({ where: { id } });
