"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _passport = _interopRequireDefault(require("passport"));

var _expressBodyTrimmer = _interopRequireDefault(require("express-body-trimmer"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _accounts = _interopRequireDefault(require("./routes/accounts"));

var _transactions = _interopRequireDefault(require("./routes/transactions"));

var _strategies = _interopRequireDefault(require("./Middleware/passport/strategies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-extraneous-dependencies */
var app = (0, _express["default"])();
app.use((0, _cors["default"])());

_dotenv["default"].config();

app.use(_express["default"].json());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _expressBodyTrimmer["default"])());
app.use((0, _expressSession["default"])({
  secret: process.env.SECRET
}));
(0, _strategies["default"])(_passport["default"], app);
app.use('/api/v1/auth', _auth["default"]);
app.use('/api/v1/accounts', _accounts["default"]);
app.use('/api/v1/transactions', _transactions["default"]); // Home route

app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Welcome To Banka'
  });
});
app.use(function (req, res, next) {
  var error = new Error('You are trying to access a wrong Route');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 400);
  res.json({
    status: 'error',
    error: error.message
  });
  next();
});
var PORT = process.env.PORT || 3200;
app.listen(PORT, function () {
  console.log("App listening on port ".concat(PORT));
});
var _default = app;
exports["default"] = _default;