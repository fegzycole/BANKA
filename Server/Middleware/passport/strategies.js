import FacebookStrategy from 'passport-facebook';
import socialAuthConfig from '../../config/passport.config';
import callBackFunction from './callback';

const { facebook } = socialAuthConfig;

const passportMiddleware = (passport, server) => {
  server.use(passport.initialize());
  passport.use('facebook', new FacebookStrategy(facebook, callBackFunction));
};
export default passportMiddleware;
