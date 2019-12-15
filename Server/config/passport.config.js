const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  HOST,
  TWITTER_CONSUMER_KEY,
  TWITTER_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
} = process.env;

const socialAuthConfig = {
  facebook: {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: `${HOST}/api/v1/auth/facebook/redirect`,
    profileFields: ['id', 'name', 'email'],
  },
  twitter: {
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_SECRET,
    callbackURL: `${HOST}/api/v1/auth/twitter/redirect`,
  },
  google: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: `${HOST}/api/v1/auth/google/redirect`,
  },
};
export default socialAuthConfig;
