import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


class Auth {
  static createToken(user) {
    const token = jwt.sign(
      {
        user,
      },
      process.env.SECRET,
      { expiresIn: '24h' },
    );

    return token;
  }

  static hashAllPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}

export default Auth;
