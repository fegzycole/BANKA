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
}

export default Services;
