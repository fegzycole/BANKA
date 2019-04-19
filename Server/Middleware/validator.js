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

  static validateStatusInput(user) {
    const schema = {
      status: Joi.string().required().valid('active', 'dormant').error(new Error('Status can only be active or dormant')),
    };
    return Joi.validate(user, schema);
  }

  static validateSignUpInputDb(user) {
    const schema = Joi.array().ordered(Joi.string().regex(/^\S+$/).required().error(new Error('First Name is required, It should have no whitespace(s) in between its characters')),
      Joi.string().regex(/^\S+$/).required().error(new Error('Last Name is required, It should have no whitespace(s) in between its characters')),
      Joi.string().email().required().error(new Error('Your Email is required, example fergusoniyara@banka.com')),
      Joi.string().regex(/^\S+$/).required().min(4)
        .error(new Error('Password should be at least 4 characters without any whitespace(s)')),
      Joi.string().required().valid('admin', 'cashier', 'client').error(new Error('This field is required, Account type can only be admin,cashier or staff')),
      Joi.bool().required().error(new Error('This field is required')));
    return Joi.validate(user, schema);
  }
}

export default Validator;
