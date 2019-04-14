/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import Joi from 'joi';

class Validator {
  static validateSignUpInput(user) {
    const schema = {
      firstName: Joi.string().regex(/^\S+$/).required().error(new Error('First Name is required, It should have no whitespace(s) in between its characters')),
      lastName: Joi.string().regex(/^\S+$/).required().error(new Error('Last Name is required, It should have no whitespace(s) in between its characters')),
      email: Joi.string().email().required().error(new Error('Your Email is required, example fergusoniyara@banka.com')),
      password: Joi.string().regex(/^\S+$/).required().min(4)
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
}

export default Validator;
