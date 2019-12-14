import express from 'express';
import validateSignUp from '../middleware/Validations';
import checkExistingEmail from '../middleware/Auth';
import signUpUser from '../controller/user';
import { facebookAuth, facebookAuthRedirect } from '../middleware/passport/authentication';

const router = express.Router();

router.post('/signup', validateSignUp, checkExistingEmail, signUpUser);

router.get('/facebook', facebookAuth());

router.get('/facebook/redirect', facebookAuthRedirect(), signUpUser);

router.get('/fail', (req, res) => { res.send('Failed attempt'); });

router.get('/', (req, res) => { res.send('Success'); });

export default router;
