const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  HOST,
} = process.env;

const socialAuthConfig = {
  facebook: {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: `${HOST}/api/v1/auth/facebook/redirect`,
    profileFields: ['id', 'name', 'email'],
  },
};
export default socialAuthConfig;
