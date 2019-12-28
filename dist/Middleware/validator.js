"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _index = _interopRequireDefault(require("../Database/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "validateSignInInput",
    // validate the signin input
    value: function validateSignInInput(user) {
      var schema = {
        email: _joi["default"].string().email().required().trim().error(new Error('Your email is required, example fergusoniyara@banka.com')),
        password: _joi["default"].string().regex(/^\S+$/).trim().required().error(new Error('Password should be at least 4 characters without any whitespace(s)'))
      };
      return _joi["default"].validate(user, schema);
    } // Validate the input for creation of bank accounts

  }, {
    key: "validateCreateAccount",
    value: function validateCreateAccount(user) {
      var schema = {
        type: _joi["default"].string().required().error(new Error('Enter An Account Type Please'))
      };
      return _joi["default"].validate(user, schema);
    }
  }, {
    key: "validateNewPassword",
    value: function validateNewPassword(user) {
      var schema = _joi["default"].string().required().error(new Error('Password should be at least 4 characters without any whitespace(s)'));

      return _joi["default"].validate(user, schema);
    } // Validate the status input

  }, {
    key: "validateStatusInput",
    value: function validateStatusInput(user) {
      var schema = {
        status: _joi["default"].string().required().valid('active', 'dormant').error(new Error('Status can only be active or dormant'))
      };
      return _joi["default"].validate(user, schema);
    } // validate the status input V2

  }, {
    key: "validateStatusInputdB",
    value: function validateStatusInputdB(user) {
      var schema = _joi["default"].string().required().valid('active', 'dormant').error(new Error('Status can only be active or dormant'));

      return _joi["default"].validate(user, schema);
    } // validate the account type for creation of accounts

  }, {
    key: "validateAccount",
    value: function validateAccount(user) {
      var schema = _joi["default"].string().required().valid('savings', 'current').error(new Error('This field is required, Account type can only be savings or current'));

      return _joi["default"].validate(user, schema);
    } // validate the input for changing the account status

  }, {
    key: "validateStatus",
    value: function validateStatus(req, res, next) {
      var _Validator$validateSt = Validator.validateStatusInputdB(req.body.status),
          error = _Validator$validateSt.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message
        });
      }

      return next();
    } // validate new password

  }, {
    key: "validatePasswordReset",
    value: function validatePasswordReset(req, res, next) {
      var _Validator$validateNe = Validator.validateNewPassword(req.body.password),
          error = _Validator$validateNe.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.message
        });
      }

      return next();
    }
  }, {
    key: "validateTransactionDetails",
    value: function validateTransactionDetails(user) {
      var schema = {
        amountToDeposit: _joi["default"].number().required().error(new Error('Please put in a number to deposit or withdraw')),
        type: _joi["default"].string().required().valid('credit', 'debit').error(new Error('Put in a transaction type please'))
      };
      return _joi["default"].validate(user, schema);
    } // validate the input for  creating a new account

  }, {
    key: "validateNewAccount",
    value: function validateNewAccount(req, res, next) {
      var _Validator$validateSi = Validator.validateSignUpInput(req.body),
          error = _Validator$validateSi.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      }

      return next();
    } // validate the input when a user wants to log in

  }, {
    key: "validateLogIn",
    value: function validateLogIn(req, res, next) {
      var _Validator$validateSi2 = Validator.validateSignInInput(req.body),
          error = _Validator$validateSi2.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      }

      return next();
    } // Check for existing emails

  }, {
    key: "checkExistingEmail",
    value: function checkExistingEmail(req, res, next) {
      var emailChecker, email;
      return regeneratorRuntime.async(function checkExistingEmail$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT email FROM userstable'));

            case 3:
              emailChecker = _context.sent;
              email = emailChecker.rows.find(function (c) {
                return c.email === req.body.email;
              }) || emailChecker.rows.find(function (c) {
                return c.email === req.params.email;
              });

              if (!(req.route.path === '/signup')) {
                _context.next = 8;
                break;
              }

              if (!email) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(409).json({
                status: 409,
                error: 'Email Already Exists'
              }));

            case 8:
              if (!(req.route.path === '/signin' || req.route.path === '/:email/accounts' || req.route.path === '/:email/reset' || req.route.path === '/:email/transactions')) {
                _context.next = 11;
                break;
              }

              if (email) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                status: 404,
                error: 'Email does not exist'
              }));

            case 11:
              return _context.abrupt("return", next());

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 14]]);
    }
  }, {
    key: "validateTransaction",
    value: function validateTransaction(req, res, next) {
      var _Validator$validateTr = Validator.validateTransactionDetails(req.body),
          error = _Validator$validateTr.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.message
        });
      }

      return next();
    } // check the account number

  }, {
    key: "checkAccountNo",
    value: function checkAccountNo(req, res, next) {
      var accountChecker, account;
      return regeneratorRuntime.async(function checkAccountNo$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT accountnumber FROM accountstable'));

            case 3:
              accountChecker = _context2.sent;
              account = accountChecker.rows.find(function (c) {
                return c.accountnumber === parseInt(req.params.accountNo, 10);
              });

              if (account) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                error: 'Account Not Found'
              }));

            case 7:
              return _context2.abrupt("return", next());

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 10]]);
    } // check the Id

  }, {
    key: "checkId",
    value: function checkId(req, res, next) {
      var idChecker;
      return regeneratorRuntime.async(function checkId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_index["default"].query('SELECT id FROM transactions WHERE id = $1', [parseInt(req.params.id, 10)]));

            case 2:
              idChecker = _context3.sent;

              if (idChecker.rows.length) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                error: 'No Transaction with the stated ID'
              }));

            case 5:
              return _context3.abrupt("return", next());

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return Validator;
}();

var _default = Validator;
exports["default"] = _default;