import express from 'express';
import userController from '../Controller/userController';
import Validator from '../Middleware/validator';
import Service from '../services/service';

const {
  checkExistingEmail,
  validateNewAccount,
  validateLogIn,
  validatePasswordReset,
} = Validator;

const { sendPasswordResetEmail } = Service;

const router = express.Router();

const { CreateAccount, signIn, passwordReset } = userController;

router.post('/signup', validateNewAccount, checkExistingEmail, CreateAccount);

router.post('/signin', validateLogIn, checkExistingEmail, signIn);

router.post('/:email/reset', validatePasswordReset, checkExistingEmail, passwordReset, sendPasswordResetEmail);


export default router;
