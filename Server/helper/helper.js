/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable indent */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import testData from '../data/testData';
import Db from '../Database/index';

dotenv.config();

const { accounts } = testData;
class Helper {
  static async findUserByEmailDb(user) {
    try {
    const { rows } = await Db.query('SELECT email FROM userstable  WHERE email = $1', [user]);
    return rows;
    } catch (err) {
     return err.error;
   }
  }

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

  static async createAccountNumberDb() {
    try {
      await Db.query('BEGIN');
      const arrayHandler = await Db.query('SELECT * FROM accountstable');
      if (arrayHandler.rows.length === 0) {
        return 200000001;
      }
      return 200000001 + arrayHandler.rows.length + 1;
    } catch (e) {
      return e.error;
    }
  }

  static verifyTokenTransactions(req, res, next) {
    try {
      const token = req.body.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            return res.status(404).json({
              status: 404,
              message: err,
            });
          }
          req.decoded = decoded.user;
        });
      }
      // verify user provided token against existing token
      if (req.decoded.type === 'client' || req.decoded.type === 'admin') {
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

  static verifyTokenAccounts(req, res, next) {
    try {
      const token = req.body.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            return res.status(404).json({
              status: 404,
              message: err,
            });
          }
          req.decoded = decoded.user;
        });
      }
      // verify user provided token against existing token
      if (req.decoded.type === 'client') {
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

  static verifyTokenAll(req, res, next) {
    try {
      const token = req.body.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            return res.status(404).json({
              status: 404,
              message: err,
            });
          }
          req.decoded = decoded.user;
        });
      }
      // verify user provided token against existing token
      if (req.decoded.type !== 'client' && req.decoded.type !== 'cashier' && req.decoded.type !== 'admin') {
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
