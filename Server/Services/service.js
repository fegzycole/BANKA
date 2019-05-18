import sgMail from '@sendgrid/mail';
import Db from '../Database/index';

class Services {
  static cashierToken(req, res, next) {
    if (req.decoded.user.type !== 'cashier') {
      return res.json({
        status: 401,
        error: 'You do not have the rights to this resource',
      });
    }
    return next();
  }

  static staffToken(req, res, next) {
    // verify user provided token against existing token
    if (req.decoded.user.type === 'client') {
      return res.json({
        status: 401,
        error: 'You do not have the rights to this resource',
      });
    }
    return next();
  }

  // Send new password to user
  // eslint-disable-next-line consistent-return
  static async sendPasswordResetEmail(req, res) {
    try {
      const emailChecker = await Db.query('SELECT email, firstname FROM userstable  WHERE email = $1', [req.params.email]);
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: `${req.params.email}`,
        from: 'ferguson@banka.com',
        subject: 'PASSWORD RESET SUCCESSFUL',
        text: `Hi ${emailChecker.rows[0].firstname}, your new password is ${req.body.password}`,
      };
      await sgMail.send(msg);
      return res.json({
        status: 200,
        data: 'message sent',
      });
    } catch (err) {
      res.json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default Services;
