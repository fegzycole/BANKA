import express from 'express';
import validateSignUp from '../middleware/Validations';
import checkExistingEmail from '../middleware/Auth';
import signUpUser from '../controller/user';
import { 
  facebookAuth,
  facebookAuthRedirect,
  twitterAuth,
  twitterAuthRedirect,
  googleAuth,
  googleAuthRedirect,
} from '../middleware/passport/authentication';

const router = express.Router();

router.post('/signup', validateSignUp, checkExistingEmail, signUpUser);

router.get('/facebook', facebookAuth());

router.get('/facebook/redirect', facebookAuthRedirect(), signUpUser);

router.get('/twitter', twitterAuth());

router.get('/twitter/redirect', twitterAuthRedirect(), signUpUser);

router.get('/google', googleAuth());

router.get('/google/redirect', googleAuthRedirect(), signUpUser);

export default router;
