import bcrypt from 'bcryptjs';
import Validator from '../Middleware/validator';
import testData from '../data/testData';
import Helper from '../helper/helper';
import Db from '../Database/index';

const { findUserByEmail, createToken } = Helper;

const { validateSignUpInput, validateSignUpInputDb } = Validator;

const { users } = testData;


class UserController {
  static createUserAccount(req, res) {
    // variable checking for admin status
    let isAdmin;

    const { body } = req;

    if (body.type === 'client' || body.type === 'cashier') {
      isAdmin = false;
    } else if (body.type === 'admin') {
      isAdmin = true;
    }

    const user = {
      id: users.length + 1,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      password: bcrypt.hashSync(body.password, 10),
      type: body.type.trim(),
      isAdmin,
    };

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

  static async dbCreateAccount(req, res) {
    try {
      // variable checking for admin status
      let isadmin;
      const { body } = req;
      if (body.type === 'client' || body.type === 'cashier') {
        isadmin = false;
      } else if (body.type === 'admin') {
        isadmin = true;
      }
      const user = [
        body.firstname.trim(),
        body.lastname.trim(),
        body.email.trim(),
        bcrypt.hashSync(body.password, 10),
        body.type.trim(),
        isadmin,
      ];
      // check if user passes valid and required data
      const { error } = validateSignUpInputDb(user);
      // check if user inputs are valid
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      }
      // check if email already exists
      await Db.query('BEGIN');
      // eslint-disable-next-line consistent-return
      const emailChecker = await Db.query('SELECT email FROM userstable  WHERE email = $1', [body.email]);
      if (emailChecker.rows.length !== 0) {
        return res.status(404).json({
          status: 404,
          message: 'Email Already Exists',
        });
      }
      const queryString = 'INSERT INTO userstable(firstname, lastname, email, password, type, isadmin) VALUES($1, $2, $3, $4, $5, $6) returning *';
      const { rows } = await Db.query(queryString, user);
      // create token
      const token = createToken(rows[0]);
      await Db.query('COMMIT');
      return res.status(201).json({
        status: 201,
        data: {
          firstname: rows[0].firstname,
          laststname: rows[0].lastname,
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

  static async logindB(req, res) {
    const { body } = req;

    const userDetails = [body.email, body.password];
    try {
      const emailChecker = await Db.query('SELECT * FROM userstable  WHERE email = $1', [body.email]);
      if (emailChecker.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Email not Registered',
        });
      }
      const getPassword = await Db.query('SELECT password FROM userstable WHERE email = $1', [body.email]);
      const passwordChecker = bcrypt.compareSync(body.password, getPassword.rows[0].password);
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

  static async getUserAccounts(req, res) {
    try {
      const emailChecker = await Db.query('SELECT email, id FROM userstable  WHERE email = $1', [req.params.email]);
      if (emailChecker.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No user with the stated email',
        });
      }
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
}

export default UserController;
