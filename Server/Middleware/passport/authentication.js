import passport from 'passport';

export const facebookAuth = () => passport.authenticate('facebook');

export const facebookAuthRedirect = () => passport.authenticate('facebook', { session: false });
