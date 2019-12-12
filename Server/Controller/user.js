import models from '../models';
import { errResponse, successResponse, generateToken } from '../helper/helper';

const { User } = models;

const signUpUser = async (req, res) => {
  try {
    const newUser = req.body;
    newUser.isAdmin = false;
    const user = await User.create(newUser);
    const payload = user.getSafeDataValues();
    const token = generateToken(payload);
    payload.token = token;
    return successResponse(res, 201, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export default signUpUser;
