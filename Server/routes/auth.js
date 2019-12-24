import express from 'express';
import { validateSignup } from '../Middleware/Validations';
import { checkExistingUser } from '../Middleware/Auth';
import { signUpUser, oAuth } from '../Controller/user';
import { 
  facebookAuth,
  facebookAuthRedirect,
  twitterAuth,
  twitterAuthRedirect,
  googleAuth,
  googleAuthRedirect,
} from '../Middleware/passport/authentication';

const router = express.Router();

router.post('/signup', validateSignup, checkExistingUser, signUpUser);

router.get('/facebook', facebookAuth());

router.get('/facebook/redirect', facebookAuthRedirect(), oAuth);

router.get('/twitter', twitterAuth());

router.get('/twitter/redirect', twitterAuthRedirect(), oAuth);

router.get('/google', googleAuth());

router.get('/google/redirect', googleAuthRedirect(), oAuth);

export default router;
