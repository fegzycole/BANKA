"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _helper = _interopRequireDefault(require("../helper/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var _testData = testData,
    accounts = _testData.accounts;
var _Validator = Validator,
    validateCreateAccount = _Validator.validateCreateAccount,
    validateStatusInput = _Validator.validateStatusInput;
var createAccountNumber = _helper["default"].createAccountNumber,
    createAccountNumberDb = _helper["default"].createAccountNumberDb;

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "getTransactionsHistory",

    /**
     * Get all Transactions for an account(V2)
     * @param {*} req
     * @param {*} res
     */
    value: function getTransactionsHistory(req, res) {
      var select;
      return regeneratorRuntime.async(function getTransactionsHistory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(Db.query('SELECT id, CAST(createdon as DATE), type, CAST(accountnumber as INTEGER), CAST(amount as FLOAT), CAST(oldbalance as FLOAT), CAST(newbalance as FLOAT) FROM transactions WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]));

            case 3:
              select = _context.sent;
              return _context.abrupt("return", res.json({
                status: 200,
                data: select.rows
              }));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                status: 500,
                error: 'Sorry, something went wrong, try again'
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
    /**
     * Get an account's details(V2)
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: "getspecificAccount",
    value: function getspecificAccount(req, res) {
      var getOwner, getOwnerEmail, balance;
      return regeneratorRuntime.async(function getspecificAccount$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(Db.query('SELECT createdon, CAST(accountnumber as INTEGER), type, status, CAST(balance as FLOAT), owner FROM accountstable WHERE accountnumber = $1', [parseInt(req.params.accountNo, 10)]));

            case 3:
              getOwner = _context2.sent;
              _context2.next = 6;
              return regeneratorRuntime.awrap(Db.query('SELECT email FROM userstable WHERE id = $1', [parseInt(getOwner.rows[0].owner, 10)]));

            case 6:
              getOwnerEmail = _context2.sent;
              balance = Number(getOwner.rows[0].balance).toFixed(2);
              return _context2.abrupt("return", res.json({
                status: 200,
                data: {
                  createdOn: getOwner.rows[0].createdon,
                  accountNumber: parseInt(req.params.accountNo, 10),
                  ownerEmail: getOwnerEmail.rows[0].email,
                  type: getOwner.rows[0].type,
                  status: getOwner.rows[0].status,
                  balance: parseFloat(balance)
                }
              }));

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                status: 500,
                error: 'Sorry, something went wrong, try again'
              }));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
    /**
     * Get all bank accounts(V2)
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: "getAllAccounts",
    value: function getAllAccounts(req, res) {
      var _ref, _rows, _ref2, _rows2, _ref3, rows;

      return regeneratorRuntime.async(function getAllAccounts$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (!(req.query.status === 'active')) {
                _context3.next = 7;
                break;
              }

              _context3.next = 4;
              return regeneratorRuntime.awrap(Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id WHERE status = $1', ['active']));

            case 4:
              _ref = _context3.sent;
              _rows = _ref.rows;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: _rows
              }));

            case 7:
              if (!(req.query.status === 'dormant')) {
                _context3.next = 13;
                break;
              }

              _context3.next = 10;
              return regeneratorRuntime.awrap(Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id WHERE status = $1', ['dormant']));

            case 10:
              _ref2 = _context3.sent;
              _rows2 = _ref2.rows;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: _rows2
              }));

            case 13:
              _context3.next = 15;
              return regeneratorRuntime.awrap(Db.query('SELECT accountstable.createdon, CAST(accountstable.accountnumber as INTEGER), userstable.email, accountstable.type, accountstable.status, CAST(accountstable.balance as FLOAT) from accountstable inner join userstable on accountstable.owner = userstable.id'));

            case 15:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: rows
              }));

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", _context3.t0);

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 20]]);
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;