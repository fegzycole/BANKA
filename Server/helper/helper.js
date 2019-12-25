import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Validator from 'validatorjs';
import bigInt from 'big-integer';
import models from '../models/index';

const { User } = models;

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

export const hashPassword = (password) => { bcrypt.hashSync(password, bcrypt.genSaltSync(10)); };

export const validate = (data, rules, res, next) => {
  const validation = new Validator(data, rules);

  if (validation.fails()) {
    return errResponse(res, 400, validation.errors.all());
  }

  return next();
};

export const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);

export const generateAccountNumber = () => {
  return bigInt(12);
};

export const userExists = async (email) => await User.findOne({ where: { email } });
