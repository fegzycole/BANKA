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
