import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { errResponse, comparePassword, userExists } from '../helper/helper';

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
    const { email } = req.body;
    const user = await userExists(email);

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

  if (!type || type !== 'customer') {
    return errResponse(res, 403, 'only a customer can create an account');
  }

  return next();
}
