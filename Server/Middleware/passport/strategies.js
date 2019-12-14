import FacebookStrategy from 'passport-facebook';
import TwitterStrategy from 'passport-twitter';
import GoogleStrategy from 'passport-google-oauth2';
import socialAuthConfig from '../../config/passport.config';
import callBackFunction from './callback';

const { facebook, twitter, google } = socialAuthConfig;

const passportMiddleware = (passport, server) => {
  server.use(passport.initialize());

  passport.use('facebook', new FacebookStrategy(facebook, callBackFunction));

  passport.use('twitter', new TwitterStrategy(twitter, callBackFunction));

  passport.use('google', new GoogleStrategy(google, callBackFunction));
};
export default passportMiddleware;
