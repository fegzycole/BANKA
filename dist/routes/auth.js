"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Validations = require("../Middleware/Validations");

var _Auth = require("../Middleware/Auth");

var _user = require("../Controller/user");

var _authentication = require("../Middleware/passport/authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signup', _Validations.validateSignup, _Auth.checkExistingUser, _user.signUpUser);
router.get('/facebook', (0, _authentication.facebookAuth)());
router.get('/facebook/redirect', (0, _authentication.facebookAuthRedirect)(), _user.oAuth);
router.get('/twitter', (0, _authentication.twitterAuth)());
router.get('/twitter/redirect', (0, _authentication.twitterAuthRedirect)(), _user.oAuth);
router.get('/google', (0, _authentication.googleAuth)());
router.get('/google/redirect', (0, _authentication.googleAuthRedirect)(), _user.oAuth);
router.post('/signin', _Validations.validateSignIn, _Auth.checkUserEmail, _Auth.compareUserPassword, _user.signIn);
var _default = router;
exports["default"] = _default;