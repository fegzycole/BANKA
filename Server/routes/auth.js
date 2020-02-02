import express from 'express';
import {
  validateSignup,
  validateSignIn,
  validateCreateStaff,
} from '../Middleware/Validations';

import {
  checkExistingUser,
  checkUserEmail,
  compareUserPassword,
  confirmAdmin, authorizeUser,
} from '../Middleware/Auth';

import {
  signUpUser, oAuth, signIn, createStaff, allStaff, deleteStaff,
} from '../Controller/user';

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

router.post(
  '/createstaff',
  authorizeUser,
  confirmAdmin,
  validateCreateStaff,
  checkExistingUser,
  createStaff,
);

router.get('/facebook', facebookAuth());

router.get('/facebook/redirect', facebookAuthRedirect(), oAuth);

router.get('/twitter', twitterAuth());

router.get('/twitter/redirect', twitterAuthRedirect(), oAuth);

router.get('/google', googleAuth());

router.get('/google/redirect', googleAuthRedirect(), oAuth);

router.post(
  '/signin',
  validateSignIn,
  checkUserEmail,
  compareUserPassword,
  signIn,
);

router.get('/allstaff', authorizeUser, confirmAdmin, allStaff);

router.delete('/:email/user', authorizeUser, confirmAdmin, checkUserEmail, deleteStaff);

export default router;
