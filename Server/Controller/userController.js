import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Validator from '../Middleware/validator';
import testData from '../data/testData';
import Helper from '../helper/helper';
import Db from '../Database/index';


dotenv.config();

const { findUserByEmail, createToken } = Helper;

const { validateSignUpInput } = Validator;

const { users } = testData;


class UserController {
  /**
   * Signup a new user V1
   * @param {*} req
   * @param {*} res
   */
  static createUserAccount(req, res) {
    // variable checking for admin status
    let isAdmin;

    const { body } = req;

    if (body.type === 'client' || body.type === 'cashier') {
      isAdmin = false;
    } else if (body.type === 'admin') {
      isAdmin = true;
    }
    // check if user passes valid and required data
    const { error } = validateSignUpInput(body);
    // check if user inputs are valid
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    try {
      const user = {
        id: users.length + 1,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        type: body.type,
        isAdmin,
      };
      // check if email already exists
      const emailExists = findUserByEmail(users);

      if (emailExists.includes(user.email)) {
        return res.status(409).json({
          status: 409,
          message: 'Email Already exists',
        });
      }
      // create token
      const token = createToken(user);
      users.push(user);// Should be moved down
      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          type: user.type,
          isAdmin,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  /**
   * Signup a new user V2
   * @param {*} req
   * @param {*} res
   */
  static async CreateAccount(req, res) {
    try {
      let isadmin;
      if (req.body.type === ('client') || req.body.type === ('cashier')) {
        isadmin = false;
      }
      if (req.body.type === 'admin') {
        isadmin = true;
      }
      const newUser = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        bcrypt.hashSync(req.body.password, 10),
        req.body.type,
        isadmin,
      ];
      // variable checking for admin status
      const queryString = 'INSERT INTO userstable(firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6) returning *';
      const { rows } = await Db.query(queryString, newUser);
      const token = createToken(rows[0]);
      await Db.query('COMMIT');
      const getId = await Db.query('SELECT id from userstable WHERE email = $1', [rows[0].email]);
      return res.status(201).json({
        status: 201,
        data: {
          id: getId.rows[0].id,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
          isadmin,
          token,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        errors: 'internal server error',
      });
    }
  }

  /**
   * User signin V1
   * @param {*} req
   * @param {*} res
   */
  static login(req, res) {
    const { body } = req;

    const userDetails = {
      email: body.email,
      password: body.password,
    };

    try {
      const emailExists = findUserByEmail(users);

      if (!emailExists.includes(userDetails.email)) {
        return res.status(409).json({
          status: 409,
          error: 'Authentication Failed',
          message: 'Email or password invalid',
        });
      }
      const { email, password } = userDetails;

      const userInfo = users.find(user => user.email === email);

      const storedPassword = bcrypt.hashSync(userInfo.password);

      const passwordChecker = bcrypt.compareSync(password, storedPassword);

      if (passwordChecker) {
        const token = createToken(userInfo);
        return res.status(200).json({
          status: 200,
          data: {
            token,
            id: userInfo.id,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
          },
        });
      }

      return res.json({
        status: 401,
        error: 'Authentication Failed. Incorrect Password',
        message: 'Request denied',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  /**
   * User signin V2
   * @param {*} req
   * @param {*} res
   */
  static async signIn(req, res) {
    const { body } = req;
    try {
      const emailChecker = await Db.query('SELECT * FROM userstable  WHERE email = $1', [body.email]);
      const passwordChecker = bcrypt.compareSync(body.password, emailChecker.rows[0].password);
      if (passwordChecker) {
        const token = createToken(emailChecker.rows[0]);
        return res.status(200).json({
          status: 200,
          data: {
            token,
            id: emailChecker.rows[0].id,
            firstName: emailChecker.rows[0].firstname,
            lastName: emailChecker.rows[0].lastname,
            email: emailChecker.rows[0].email,
            type: emailChecker.rows[0].type,
            isadmin: emailChecker.rows[0].isadmin,
          },
        });
      }
      return res.json({
        status: 401,
        error: 'Email or Password Incorrect',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  /**
   * Get all bank accounts belonging to a user V2
   * @param {*} req
   * @param {*} res
   */
  static async getUserAccounts(req, res) {
    try {
      const emailChecker = await Db.query('SELECT id FROM userstable  WHERE email = $1', [req.params.email]);
      const id = parseInt(emailChecker.rows[0].id, 10);
      const getOwner = await Db.query('SELECT createdon, CAST(accountnumber as INTEGER), type, status, CAST(balance as FLOAT) FROM accountstable WHERE owner = $1', [id]);
      return res.json({
        status: 200,
        accounts: getOwner.rows,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }


  static async getUserAccountsJoin(req, res) {
    try {
      const emailChecker = await Db.query('SELECT id FROM userstable  WHERE email = $1', [req.params.email]);
      const id = parseInt(emailChecker.rows[0].id, 10);
      const getOwner = await Db.query('SELECT transactions.createdon, CAST(accountstable.accountnumber as INTEGER), transactions.type, CAST(transactions.oldbalance as FLOAT) , CAST(transactions.newbalance as FLOAT), CAST(transactions.amount as FLOAT) from transactions inner join accountstable on transactions.accountnumber = accountstable.accountnumber WHERE owner = $1', [id]);
      return res.json({
        status: 200,
        accounts: getOwner.rows,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static async getAccountsByAccountNumber(req, res) {
    try {
      const { accountNo } = req.params;
      const getOwner = await Db.query('SELECT createdon, CAST(accountnumber as INTEGER), type, CAST(oldbalance as FLOAT) , CAST(newbalance as FLOAT) from transactions WHERE accountnumber = $1', [parseInt(accountNo, 10)]);
      return res.json({
        status: 200,
        accounts: getOwner.rows,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static async passwordReset(req, res, next) {
    try {
      const emailChecker = await Db.query('SELECT email, firstname FROM userstable  WHERE email = $1', [req.params.email]);
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const update = 'UPDATE userstable SET password = $1 WHERE email = $2 returning *';
      await Db.query(update, [hashedPassword, emailChecker.rows[0].email]);
      await Db.query('COMMIT');
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default UserController;
