"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleAuthRedirect = exports.googleAuth = exports.twitterAuthRedirect = exports.twitterAuth = exports.facebookAuthRedirect = exports.facebookAuth = void 0;

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var facebookAuth = function facebookAuth() {
  return _passport["default"].authenticate('facebook');
};

exports.facebookAuth = facebookAuth;

var facebookAuthRedirect = function facebookAuthRedirect() {
  return _passport["default"].authenticate('facebook', {
    session: false
  });
};

exports.facebookAuthRedirect = facebookAuthRedirect;

var twitterAuth = function twitterAuth() {
  return _passport["default"].authenticate('twitter');
};

exports.twitterAuth = twitterAuth;

var twitterAuthRedirect = function twitterAuthRedirect() {
  return _passport["default"].authenticate('twitter', {
    session: false
  });
};

exports.twitterAuthRedirect = twitterAuthRedirect;

var googleAuth = function googleAuth() {
  return _passport["default"].authenticate('google', {
    scope: ['profile', 'email']
  });
};

exports.googleAuth = googleAuth;

var googleAuthRedirect = function googleAuthRedirect() {
  return _passport["default"].authenticate('google', {
    session: false
  });
};

exports.googleAuthRedirect = googleAuthRedirect;