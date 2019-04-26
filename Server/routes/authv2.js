import express from 'express';
import userController from '../Controller/userController';
import Validator from '../Middleware/validator';
// import Service from '../Services/service';

const {
  checkEmails, checkExistingEmail,
  validateNewAccount, validateLogIn,
} = Validator;

// const { checkAdminStatus } = Service;

const router = express.Router();

const { CreateAccount, logindB } = userController;

router.post('/signup', validateNewAccount, checkExistingEmail, CreateAccount);

router.post('/signin', validateLogIn, checkEmails, logindB);

// router.post('/:email', resetPasswordB);


export default router;
