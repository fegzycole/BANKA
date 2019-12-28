"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _passportTwitter = _interopRequireDefault(require("passport-twitter"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));

var _passport = _interopRequireDefault(require("../../config/passport.config"));

var _callback = _interopRequireDefault(require("./callback"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var facebook = _passport["default"].facebook,
    twitter = _passport["default"].twitter,
    google = _passport["default"].google;

var passportMiddleware = function passportMiddleware(passport, server) {
  server.use(passport.initialize());
  passport.use('facebook', new _passportFacebook["default"](facebook, _callback["default"]));
  passport.use('twitter', new _passportTwitter["default"](twitter, _callback["default"]));
  passport.use('google', new _passportGoogleOauth["default"](google, _callback["default"]));
};

var _default = passportMiddleware;
exports["default"] = _default;