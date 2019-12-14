import models from '../models';
import { errResponse, successResponse, generateToken } from '../helper/helper';

const { User } = models;

const signUpUser = async (req, res) => {
  try {
    const { oauthId } = req.user;
    let user;
    let payload;

    if (oauthId) {
      user = User.findOrCreate({
        where: { oauthId },
        defaults: req.user,
      });
      payload = { ...req.user };
      delete payload.oauthId;
      delete payload.password;
    } else {
      user = await User.create(req.user);
      payload = user.getSafeDataValues();
    }

    payload.token = generateToken(payload);
    return successResponse(res, 201, payload);
  } catch (error) {
    return errResponse(res, 500, error.message);
  }
};

export default signUpUser;
