
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import testData from '../data/testData';
import Db from '../Database/index';

dotenv.config();

const { accounts } = testData;
class Helper {
  // find a user by emailv2
  static async findUserByEmailDb(user) {
    try {
      const { rows } = await Db.query('SELECT email FROM userstable  WHERE email = $1', [user]);
      return rows;
    } catch (err) {
      return err.error;
    }
  }

  // fin a user by email v1
  static findUserByEmail(users) {
    return users.reduce((emailArray, userDetail) => emailArray.concat(userDetail.email), []);
  }

  // create JsonWebToken for new user
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

  // create an account number v1
  static createAccountNumber() {
    return 200000001 + accounts.length;
  }

  // Create a unique account number v2
  static async createAccountNumberDb() {
    try {
      let getMaxId = 0;
      await Db.query('BEGIN');
      const arrayHandler = await Db.query('SELECT * FROM accountstable');
      if (arrayHandler.rows.length === 0) {
        return 200000001;
      }

      for (let i = 0; i < arrayHandler.rows.length; i += 1) {
        if (arrayHandler.rows[i].id > getMaxId) {
          getMaxId = arrayHandler.rows[i].id;
        }
      }
      return 20000000 + parseInt(getMaxId, 10) + 1;
    } catch (e) {
      return e.error;
    }
  }

  // Token verification Logic that permits only cashiers to do cash transactions
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

  // Token verification Logic that permits only cashiers/admins to do account related transactions
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

  // Token verification Logic that permits clients, cashiers and admins to view transactions
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
