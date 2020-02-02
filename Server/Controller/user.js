import { Op } from 'sequelize';
import models from '../models';
import { errResponse, successResponse, generateToken } from '../helper/helper';

const { User } = models;

export const signUpUser = async (req, res) => {
  try {
    req.user.isAdmin = false;
    const user = await User.create(req.user);
    const payload = user.getSafeDataValues();
    payload.token = generateToken(payload);
    return successResponse(res, 201, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const oAuth = async (req, res) => {
  try {
    const { oauthId } = req.user;
    const [user] = await User.findOrCreate({
      where: { oauthId },
      defaults: req.user,
    });

    const payload = user.getSafeDataValues();
    payload.token = generateToken(payload);
    return successResponse(res, 201, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    const payload = req.user;
    payload.token = generateToken(payload);
    return successResponse(res, 200, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const createStaff = async (req, res) => {
  try {
    if (req.user.type === 'admin') {
      req.user.isAdmin = true;
    } else {
      req.user.isAdmin = false;
    }

    const user = await User.create(req.user);
    const payload = user.getSafeDataValues();
    payload.token = generateToken(payload);
    return successResponse(res, 201, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const allStaff = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        type: {
          [Op.or]: ['admin', 'cashier'],
        },
      },
    });

    const data = [];

    users.forEach((user) => {
      data.push(user.getSafeDataValues());
    });

    return successResponse(res, 200, data);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export const deleteStaff = async (req, res) => {
  const { email } = req.params;
  try {
    await User.destroy({ where: { email } });
    return successResponse(res, 200, 'Staff deleted successfully');
  } catch (error) {
    return errResponse(res, 500, error);
  }
};
