"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTransactionId = exports.confirmStaff = exports.confirmOwner = exports.checkAccountNumber = exports.confirmCashAvailability = exports.confirmCashier = exports.confirmAdmin = exports.checkUserAccountType = exports.authorizeUser = exports.compareUserPassword = exports.checkUserEmail = exports.checkExistingUser = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _helper = require("../helper/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();

var checkExistingUser = function checkExistingUser(req, res, next) {
  var email, user;
  return regeneratorRuntime.async(function checkExistingUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _helper.userExists)(email));

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", (0, _helper.errResponse)(res, 409, 'Email already exists!'));

        case 7:
          req.user = req.body;
          return _context.abrupt("return", next());

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", (0, _helper.errResponse)(res, 500, _context.t0.message));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.checkExistingUser = checkExistingUser;

var checkUserEmail = function checkUserEmail(req, res, next) {
  var email, user;
  return regeneratorRuntime.async(function checkUserEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          email = req.body.email;
          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _helper.userExists)(email));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", (0, _helper.errResponse)(res, 404, 'User not found'));

        case 7:
          req.user = user;
          return _context2.abrupt("return", next());

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", (0, _helper.errResponse)(res, 500, _context2.t0.message));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.checkUserEmail = checkUserEmail;

var compareUserPassword = function compareUserPassword(req, res, next) {
  var passwordInDb = req.user.password;
  var passwordInRequest = req.body.password;
  var passwordMatches = (0, _helper.comparePassword)(passwordInDb, passwordInRequest);

  if (!passwordMatches) {
    return (0, _helper.errResponse)(res, 401, 'Authentication Failed, Email or Password Incorrect');
  }

  req.user = req.user.getSafeDataValues();
  return next();
};

exports.compareUserPassword = compareUserPassword;

var authorizeUser = function authorizeUser(req, res, next) {
  try {
    if (!req.headers['x-access-token'] && !req.headers.token && !req.headers.authorization && !req.body.token && !req.body.Authorization) {
      throw new Error('You do not have access to this resource');
    }

    var token = req.body.token || req.headers['x-access-token'] || req.headers.token || req.headers.authorization || req.body.token || req.body.Authorization;

    var decoded = _jsonwebtoken["default"].verify(token, process.env.SECRET);

    req.decoded = decoded;
    return next();
  } catch (error) {
    return (0, _helper.errResponse)(res, 401, error.message);
  }
};

exports.authorizeUser = authorizeUser;

var checkUserAccountType = function checkUserAccountType(req, res, next) {
  var type = req.decoded.type;

  if (type !== 'customer') {
    return (0, _helper.errResponse)(res, 403, 'only a customer can create an account');
  }

  return next();
};

exports.checkUserAccountType = checkUserAccountType;

var confirmAdmin = function confirmAdmin(req, res, next) {
  var type = req.decoded.type;

  if (type !== 'admin') {
    return (0, _helper.errResponse)(res, 403, 'only an admin can change the status of an account');
  }

  return next();
};

exports.confirmAdmin = confirmAdmin;

var confirmCashier = function confirmCashier(req, res, next) {
  var type = req.decoded.type;

  if (type !== 'cashier') {
    return (0, _helper.errResponse)(res, 403, 'only a cashier can perform cash transactions');
  }

  return next();
};

exports.confirmCashier = confirmCashier;

var confirmCashAvailability = function confirmCashAvailability(req, res, next) {
  var balance = req.account.balance;
  var _req$body = req.body,
      type = _req$body.type,
      amount = _req$body.amount;

  if (type === 'debit' && balance - amount < 0) {
    return (0, _helper.errResponse)(res, 400, 'Insufficient funds!');
  }

  return next();
};

exports.confirmCashAvailability = confirmCashAvailability;

var checkAccountNumber = function checkAccountNumber(req, res, next) {
  var accountNumber, account;
  return regeneratorRuntime.async(function checkAccountNumber$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          accountNumber = req.params.accountNumber;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _helper.accountExists)(Number(accountNumber)));

        case 3:
          account = _context3.sent;

          if (account) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", (0, _helper.errResponse)(res, 404, 'Account not found'));

        case 6:
          req.account = account;
          return _context3.abrupt("return", next());

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.checkAccountNumber = checkAccountNumber;

var confirmOwner = function confirmOwner(req, res, next) {
  var dataValues, owner, _req$decoded, id, type, validTypes;

  return regeneratorRuntime.async(function confirmOwner$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          dataValues = req.account.dataValues;
          owner = dataValues.owner;
          _req$decoded = req.decoded, id = _req$decoded.id, type = _req$decoded.type;
          validTypes = ['admin', 'cashier'];

          if (!(!validTypes.includes(type) && owner !== id)) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", (0, _helper.errResponse)(res, 403, 'You do not have the rights to this resource'));

        case 6:
          return _context4.abrupt("return", next());

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.confirmOwner = confirmOwner;

var confirmStaff = function confirmStaff(req, res, next) {
  var type, validTypes;
  return regeneratorRuntime.async(function confirmStaff$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          type = req.decoded.type;
          validTypes = ['admin', 'cashier'];

          if (validTypes.includes(type)) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", (0, _helper.errResponse)(res, 403, 'You do not have the rights to this resource'));

        case 4:
          return _context5.abrupt("return", next());

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.confirmStaff = confirmStaff;

var checkTransactionId = function checkTransactionId(req, res, next) {
  var id, transaction;
  return regeneratorRuntime.async(function checkTransactionId$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap((0, _helper.transactionIdExists)(Number(id)));

        case 3:
          transaction = _context6.sent;

          if (transaction) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", (0, _helper.errResponse)(res, 404, 'Transaction not found'));

        case 6:
          req.transaction = transaction;
          return _context6.abrupt("return", next());

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.checkTransactionId = checkTransactionId;