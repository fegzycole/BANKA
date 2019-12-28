"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionIdExists = exports.accountExists = exports.userExists = exports.generateAccountNumber = exports.comparePassword = exports.validate = exports.successResponse = exports.errResponse = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _validatorjs = _interopRequireDefault(require("validatorjs"));

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _index["default"].User,
    Account = _index["default"].Account,
    Transaction = _index["default"].Transaction;

_dotenv["default"].config();

var generateToken = function generateToken(payload) {
  var secretKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.SECRET;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    expiresIn: '24hrs'
  };
  return _jsonwebtoken["default"].sign(payload, secretKey, duration);
};

exports.generateToken = generateToken;

var errResponse = function errResponse(res, statusCode, errors) {
  return res.status(statusCode).json({
    status: 'error',
    errors: errors
  });
};

exports.errResponse = errResponse;

var successResponse = function successResponse(res, statusCode, data) {
  return res.status(statusCode).json({
    status: 'success',
    data: data
  });
};

exports.successResponse = successResponse;

var validate = function validate(data, rules, res, next) {
  var validation = new _validatorjs["default"](data, rules);

  if (validation.fails()) {
    return errResponse(res, 400, validation.errors.all());
  }

  return next();
};

exports.validate = validate;

var comparePassword = function comparePassword(hashPwd, password) {
  return _bcryptjs["default"].compareSync(password, hashPwd);
};

exports.comparePassword = comparePassword;

var generateAccountNumber = function generateAccountNumber() {
  var queryResult, maxId;
  return regeneratorRuntime.async(function generateAccountNumber$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Account.findAll({
            attributes: [[_sequelize["default"].fn('max', _sequelize["default"].col('id')), 'maxId']]
          }));

        case 2:
          queryResult = _context.sent;
          maxId = queryResult[0].dataValues.maxId;
          maxId = maxId === null ? 1000000000 : 1000000100 + maxId;
          return _context.abrupt("return", maxId);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.generateAccountNumber = generateAccountNumber;

var userExists = function userExists(email) {
  return regeneratorRuntime.async(function userExists$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              email: email
            }
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.userExists = userExists;

var accountExists = function accountExists(accountNumber) {
  return regeneratorRuntime.async(function accountExists$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Account.findOne({
            where: {
              accountNumber: accountNumber
            }
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.accountExists = accountExists;

var transactionIdExists = function transactionIdExists(id) {
  return regeneratorRuntime.async(function transactionIdExists$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Transaction.findOne({
            where: {
              id: id
            }
          }));

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.transactionIdExists = transactionIdExists;