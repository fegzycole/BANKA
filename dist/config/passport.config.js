"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _process$env = process.env,
    FACEBOOK_CLIENT_ID = _process$env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET = _process$env.FACEBOOK_CLIENT_SECRET,
    HOST = _process$env.HOST,
    TWITTER_CONSUMER_KEY = _process$env.TWITTER_CONSUMER_KEY,
    TWITTER_SECRET = _process$env.TWITTER_SECRET,
    GOOGLE_CLIENT_ID = _process$env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET = _process$env.GOOGLE_SECRET;
var socialAuthConfig = {
  facebook: {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "".concat(HOST, "/api/v1/auth/facebook/redirect"),
    profileFields: ['id', 'name', 'email']
  },
  twitter: {
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_SECRET,
    callbackURL: "".concat(HOST, "/api/v1/auth/twitter/redirect")
  },
  google: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "".concat(HOST, "/api/v1/auth/google/redirect")
  }
};
var _default = socialAuthConfig;
exports["default"] = _default;