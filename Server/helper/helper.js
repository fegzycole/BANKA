/* eslint-disable consistent-return */
/* eslint-disable curly */
/* eslint-disable radix */
import jwt from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv';
import testData from '../data/testData';

dotenv.config();

const { accounts } = testData;
class Helper {
  static findUserByEmail(users) {
    return users.reduce((emailArray, userDetail) => emailArray.concat(userDetail.email), []);
  }

  static createToken(user) {
    const token = jwt.sign(
      {
        user,
      },
      process.env.SECRET,
      { expiresIn: '24h' },
    );

    return token;
  }

  static createAccountNumber() {
    return 200000001 + accounts.length;
  }

  static verifyToken(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'superSecret', (err, decoded) => {
        if (err) {
          return res.status(404).json({
            status: 404,
            message: err,
          });
        }
        req.decoded = decoded.user;
      });
    }
    if (req.decoded.isStaff === false || req.decoded.isAdmin === true) {
      return res.json({
        status: 401,
        error: 'You do not have the rights to this resource',
        message: 'Request denied',
      });
    }

    try {
      // verify user provided token against existing token
      if (req.decoded.isStaff === false || req.decoded.isAdmin === true) {
        return res.json({
          status: 401,
          error: 'You do not have the rights to this resource',
          message: 'Request denied',
        });
      }


      // fire next middleware
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: [error],
      });
    }
  }
}

export default Helper;
