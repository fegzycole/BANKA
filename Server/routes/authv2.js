import express from 'express';
import userController from '../Controller/userController';
import Validator from '../Middleware/validator';
// import Service from '../Services/service';

const { checkEmails, checkExistingEmail, validateNewAccount } = Validator;

// const { checkAdminStatus } = Service;

const router = express.Router();

const { dbCreateAccount, logindB } = userController;

router.post('/signup', validateNewAccount, checkExistingEmail, dbCreateAccount);

router.post('/signin', checkEmails, logindB);

// router.post('/:email', resetPasswordB);


export default router;
