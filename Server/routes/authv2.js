import express from 'express';
import userController from '../Controller/userController';
import Validator from '../Middleware/validator';
// import Service from '../Services/service';

const {
  checkExistingEmail,
  validateNewAccount, validateLogIn,
} = Validator;

// const { checkAdminStatus } = Service;

const router = express.Router();

const { CreateAccount, signIn } = userController;

router.post('/signup', validateNewAccount, checkExistingEmail, CreateAccount);

router.post('/signin', validateLogIn, checkExistingEmail, signIn);

// router.post('/:email', resetPasswordB);


export default router;
