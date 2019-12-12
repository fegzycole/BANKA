import express from 'express';
import validateSignUp from '../middleware/Validations';
import checkExistingEmail from '../middleware/Auth';
import signUpUser from '../controller/user';

const router = express.Router();

router.post('/signup', validateSignUp, checkExistingEmail, signUpUser);

export default router;
