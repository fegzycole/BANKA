import Joi from 'joi';
import Db from '../Database/index';

class Validator {
  static validateSignUpInput(user) {
    const schema = {
      firstName: Joi.string().regex(/^\S+$/).trim().required()
        .error(new Error('First Name is required, It should have no whitespace(s) in between its characters')),
      lastName: Joi.string().regex(/^\S+$/).trim().required()
        .error(new Error('Last Name is required, It should have no whitespace(s) in between its characters')),
      email: Joi.string().email().required().trim()
        .error(new Error('Your Email is required, example fergusoniyara@banka.com')),
      password: Joi.string().regex(/^\S+$/).trim().required()
        .error(new Error('Password should be at least 4 characters without any whitespace(s)')),
      type: Joi.string().required().valid('admin', 'cashier', 'client').error(new Error('This field is required, Account type can only be admin,cashier or staff')),
    };
    return Joi.validate(user, schema);
  }

  static validateCreateAccount(user) {
    const schema = {
      type: Joi.string().required().error(new Error('Enter An Account Type Please')),
    };

    return Joi.validate(user, schema);
  }


  static validateStatusInput(user) {
    const schema = {
      status: Joi.string().required().valid('active', 'dormant').error(new Error('Status can only be active or dormant')),
    };
    return Joi.validate(user, schema);
  }

  static validateStatusInputdB(user) {
    const schema = Joi.string().required().valid('active', 'dormant').error(new Error('Status can only be active or dormant'));
    return Joi.validate(user, schema);
  }

  static validateCreateAccountDb(user) {
    const schema = Joi.string().required().valid('savings', 'current').error(new Error('This field is required, Account type can only be savings or current'));
    return Joi.validate(user, schema);
  }

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

  static async checkEmails(req, res, next) {
    try {
      const emailChecker = await Db.query('SELECT email FROM userstable');
      const email = emailChecker.rows.find(c => c.email === req.body.email) || emailChecker.rows.find(c => c.email === req.params.email);
      if (!email) {
        return res.status(422).json({
          status: 422,
          error: 'Email does not exist',
        });
      }
      return next();
    } catch (error) {
      return error;
    }
  }

  static async checkExistingEmail(req, res, next) {
    try {
      const emailChecker = await Db.query('SELECT email FROM userstable');
      const email = emailChecker.rows.find(c => c.email === req.body.email) || emailChecker.rows.find(c => c.email === req.params.email);
      if (email) {
        return res.status(422).json({
          status: 422,
          error: 'Email Already Exists',
        });
      }
      return next();
    } catch (error) {
      return error;
    }
  }

  static async checkAccountNo(req, res, next) {
    try {
      const accountChecker = await Db.query('SELECT accountnumber FROM accountstable');
      const account = accountChecker.rows.find(c => c.accountnumber === parseInt(req.params.accountNo, 10));
      if (!account) {
        return res.status(422).json({
          status: 422,
          error: 'Account Not Found',
        });
      }
      return next();
    } catch (error) {
      return error;
    }
  }

  static async checkId(req, res, next) {
    const idChecker = await Db.query('SELECT id FROM transactions WHERE id = $1', [parseInt(req.params.id, 10)]);
    if (!idChecker.rows.length) {
      return res.status(404).json({
        status: 422,
        error: 'No Transaction with the stated ID',
      });
    }
    return next();
  }
}

export default Validator;
