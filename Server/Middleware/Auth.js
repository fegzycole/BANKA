import models from '../models/index';
import { errResponse } from '../helper/helper';

const { User } = models;

const checkExistingUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return errResponse(res, 409, 'Email already exists!');
    }

    return next();
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export default checkExistingUser;
