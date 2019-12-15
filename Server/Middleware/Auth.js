import models from '../models/index';
import { errResponse, comparePassword } from '../helper/helper';

const { User } = models;

export const checkExistingUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
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
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return errResponse(res, 404, 'User not found');
    }

    req.user = user;
    return next();
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const compareUserPassword = async (req, res, next) => {
  const passwordInDb = req.user.password;
  const passwordInRequest = req.body.password;
  const passwordMatches = await comparePassword(passwordInDb, passwordInRequest);

  if (!passwordMatches) {
    return errResponse(res, 401, 'Authentication Failed, Email or Password Incorrect');
  }

  req.user = req.user.getSafeDataValues();
  return next();
};
