import signUpRules from '../helper/validationRules';
import { validate } from '../helper/helper';

const validateSignup = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  const data = {
    firstName,
    lastName,
    email,
    password,
  };
  validate(data, signUpRules, res, next);
};

export default validateSignup;
