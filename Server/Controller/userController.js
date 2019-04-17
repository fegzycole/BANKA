import bcrypt from 'bcryptjs';
import Validator from '../Middleware/validator';
import testData from '../data/testData';
import Helper from '../helper/helper';

const { findUserByEmail, createToken } = Helper;

const { validateSignUpInput } = Validator;

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
}

export default UserController;
