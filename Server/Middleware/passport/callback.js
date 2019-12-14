/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const performCallback = async (accessToken, refreshToken, profile, done) => {
  const { id } = profile;
  const { email, first_name, last_name } = profile._json;
  const user = {
    oauthId: id,
    password: `${Date.now()}${process.env.SECRET}`,
    lastName: last_name,
    firstName: first_name,
    email,
    isAdmin: false,
  };

  return done(null, user);
};
export default performCallback;
