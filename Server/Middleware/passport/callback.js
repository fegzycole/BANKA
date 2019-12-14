/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const performCallback = async (accessToken, refreshToken, profile, done) => {
  const {
    id,
    provider,
    given_name,
    family_name,
  } = profile;

  const {
    first_name,
    last_name,
    name,
  } = profile._json;

  const user = {
    oauthId: id.toString(),
    password: `${Date.now()}${process.env.SECRET}`,
    isAdmin: false,
  };

  switch (provider) {
    case 'facebook':
      user.firstName = first_name;
      user.lastName = last_name;
      break;

    case 'twitter':
      // eslint-disable-next-line no-case-declarations
      const [firstName, lastName] = name.split(' ');
      user.firstName = firstName;
      user.lastName = lastName;
      break;

    default:
      user.firstName = given_name;
      user.lastName = family_name;
      break;
  }

  return done(null, user);
};

export default performCallback;
