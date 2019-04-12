import Validator from '../Middleware/validator';
import testData from '../data/testData';
import Helper from '../helper/helper';

const { findUserByEmail, createToken } = Helper;

const { users } = testData;

const { validateSignUpInput } = Validator;


class UserController {
  static createClientAccount(req, res) {
    const { body } = req;
    const user = {
      id: users.length + 1,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      password: body.password,
      isAdmin: false,
      isStaff: false,
    };
    // check if user pass valid and required data
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
          statusCode: 409,
          message: 'Email Already exists',
        });
      }
      // push user into the test Db
      users.push(user);
      // create token
      const token = createToken(user);

      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static createCashierAccount(req, res) {
    const { body } = req;
    const user = {
      id: users.length + 1,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      password: body.password,
      isAdmin: false,
      isStaff: true,
    };
    // check if user pass valid and required data
    const { error } = validateSignUpInput(body);

    // check if user inputs are valid
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    try {
      // check if user already exists
      const emailExists = findUserByEmail(users, user.email);

      if (emailExists) {
        return res.status(409).json({
          status: 409,
          message: 'Email Already exists',
        });
      }
      // push user into the test Db
      users.push(user);
      // create token
      const token = createToken(user);

      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static createAdminAccount(req, res) {
    const { body } = req;
    const user = {
      id: users.length + 1,
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      password: body.password,
      isAdmin: true,
      isStaff: true,
    };
    // check if user pass valid and required data
    const { error } = validateSignUpInput(body);

    // check if user inputs are valid
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    try {
      // check if user already exists
      const emailExists = findUserByEmail(users, user.email);

      if (emailExists) {
        return res.status(409).json({
          status: 409,
          message: 'Email Already exists',
        });
      }
      // push user into the test Db
      users.push(user);
      // create token
      const token = createToken(user);

      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
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
      // check if email already exists
      const emailExists = findUserByEmail(users);
      if (!emailExists.includes(userDetails.email)) {
        return res.status(409).json({
          status: 401,
          error: 'Authentication Failed',
          message: 'Request denied',
        });
      }
      const { email, password } = userDetails;
      const userInfo = users.find(user => email === user.email);
      const storedPassword = userInfo.password;
      if (password === storedPassword) {
        const token = createToken(userInfo);
        return res.status(201).json({
          status: 201,
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
