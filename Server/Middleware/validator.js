import Joi from 'joi';
import Db from '../Database/index';

class Validator {
  // Validate a user when he wants to create a new account
  static validateSignUpInput(user) {
    const schema = {
      firstName: Joi.string().regex(/^\S+$/).trim().required()
        .error(new Error('First name is required, It should have no whitespace(s) in between its characters')),
      lastName: Joi.string().regex(/^\S+$/).trim().required()
        .error(new Error('Last name is required, It should have no whitespace(s) in between its characters')),
      email: Joi.string().email().required().trim()
        .error(new Error('Your Email is required, example fergusoniyara@banka.com')),
      password: Joi.string().regex(/^\S+$/).trim().required()
        .error(new Error('Password should be at least 4 characters without any whitespace(s)')),
      type: Joi.string().required().valid('admin', 'cashier', 'client').error(new Error('This field is required, Account type can only be admin,cashier or staff')),
    };
    return Joi.validate(user, schema);
  }

  // validate the signin input
  static validateSignInInput(user) {
    const schema = {
      email: Joi.string().email().required().trim()
        .error(new Error('Your email is required, example fergusoniyara@banka.com')),
      password: Joi.string().regex(/^\S+$/).trim().required()
        .error(new Error('Password should be at least 4 characters without any whitespace(s)')),
    };
    return Joi.validate(user, schema);
  }

  // Validate the input for creation of bank accounts
  static validateCreateAccount(user) {
    const schema = {
      type: Joi.string().required().error(new Error('Enter An Account Type Please')),
    };

    return Joi.validate(user, schema);
  }

  static validateNewPassword(user) {
    const schema = Joi.string().required().error(new Error('Password should be at least 4 characters without any whitespace(s)'));
    return Joi.validate(user, schema);
  }

  // Validate the status input
  static validateStatusInput(user) {
    const schema = {
      status: Joi.string().required().valid('active', 'dormant').error(new Error('Status can only be active or dormant')),
    };
    return Joi.validate(user, schema);
  }

  // validate the status input V2
  static validateStatusInputdB(user) {
    const schema = Joi.string().required().valid('active', 'dormant').error(new Error('Status can only be active or dormant'));
    return Joi.validate(user, schema);
  }

  // validate the account type for creation of accounts
  static validateAccount(user) {
    const schema = Joi.string().required().valid('savings', 'current').error(new Error('This field is required, Account type can only be savings or current'));
    return Joi.validate(user, schema);
  }

  // validate the input for changing the account status
  static validateStatus(req, res, next) {
    const { error } = Validator.validateStatusInputdB(req.body.status);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    return next();
  }

  // validate new password
  static validatePasswordReset(req, res, next) {
    const { error } = Validator.validateNewPassword(req.body.password);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    return next();
  }

  // validate the input for  creating a new account
  static validateNewAccount(req, res, next) {
    const { error } = Validator.validateSignUpInput(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
    return next();
  }

  // validate the input when a user wants to log in
  static validateLogIn(req, res, next) {
    const { error } = Validator.validateSignInInput(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
    return next();
  }

  // Check for existing emails
  static async checkExistingEmail(req, res, next) {
    try {
      const emailChecker = await Db.query('SELECT email FROM userstable');
      const email = emailChecker.rows.find(c => c.email === req.body.email)
      || emailChecker.rows.find(c => c.email === req.params.email);
      if (req.route.path === '/signup') {
        if (email) {
          return res.status(409).json({
            status: 409,
            error: 'Email Already Exists',
          });
        }
      }
      if (req.route.path === '/signin' || req.route.path === '/:email/accounts'|| req.route.path === '/:email') {
        if (!email) {
          return res.status(404).json({
            status: 404,
            error: 'Email does not exist',
          });
        }
      }
      return next();
    } catch (error) {
      return error;
    }
  }

  // check the account number
  static async checkAccountNo(req, res, next) {
    try {
      const accountChecker = await Db.query('SELECT accountnumber FROM accountstable');
      const account = accountChecker.rows.find(c => c.accountnumber === parseInt(req.params.accountNo, 10));
      if (!account) {
        return res.status(404).json({
          status: 404,
          error: 'Account Not Found',
        });
      }
      return next();
    } catch (error) {
      return error;
    }
  }

  // check the Id
  static async checkId(req, res, next) {
    const idChecker = await Db.query('SELECT id FROM transactions WHERE id = $1', [parseInt(req.params.id, 10)]);
    if (!idChecker.rows.length) {
      return res.status(404).json({
        status: 404,
        error: 'No Transaction with the stated ID',
      });
    }
    return next();
  }
}

export default Validator;
