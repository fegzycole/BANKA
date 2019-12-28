"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnAccountsTransactions = exports.getATransaction = exports.cashTransaction = void 0;

var _helper = require("../helper/helper");

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Transaction = _models["default"].Transaction;

var cashTransaction = function cashTransaction(req, res, next) {
  var _req$body, amount, type, id, account, balance, accountNumber, newBalance, transactionData, _ref, dataValues;

  return regeneratorRuntime.async(function cashTransaction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, amount = _req$body.amount, type = _req$body.type;
          id = req.decoded.id;
          account = req.account;
          balance = account.balance, accountNumber = account.accountNumber;
          _context.prev = 4;
          type === 'credit' ? newBalance = Number(parseFloat(balance + amount)) : newBalance = Number(parseFloat(balance - amount));
          _context.next = 8;
          return regeneratorRuntime.awrap(account.update({
            balance: newBalance
          }));

        case 8:
          transactionData = {
            amount: amount,
            type: type,
            accountNumber: accountNumber,
            oldBalance: balance,
            newBalance: newBalance,
            cashier: id
          };
          _context.next = 11;
          return regeneratorRuntime.awrap(Transaction.create(transactionData));

        case 11:
          _ref = _context.sent;
          dataValues = _ref.dataValues;
          return _context.abrupt("return", (0, _helper.successResponse)(res, 201, dataValues));

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", (0, _helper.errResponse)(res, 500, _context.t0.message));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 16]]);
};

exports.cashTransaction = cashTransaction;

var getATransaction = function getATransaction(req, res, next) {
  var transaction, dataValues;
  return regeneratorRuntime.async(function getATransaction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          transaction = req.transaction;
          dataValues = transaction.dataValues;
          dataValues.oldBalance = Number(parseFloat(dataValues.oldBalance));
          dataValues.newBalance = Number(parseFloat(dataValues.newBalance));
          dataValues.amount = Number(parseFloat(dataValues.amount));
          return _context2.abrupt("return", (0, _helper.successResponse)(res, 200, dataValues));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", (0, _helper.errResponse)(res, 500, _context2.t0.message));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getATransaction = getATransaction;

var getAnAccountsTransactions = function getAnAccountsTransactions(req, res, next) {
  var _req$query, page, limit, q, accountNumber, transactions;

  return regeneratorRuntime.async(function getAnAccountsTransactions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, page = _req$query.page, limit = _req$query.limit, q = _req$query.q;

          if (!(page && limit || q)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", next());

        case 4:
          accountNumber = req.params.accountNumber;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Transaction.findAll({
            where: {
              accountNumber: accountNumber
            }
          }));

        case 7:
          transactions = _context3.sent;
          transactions.forEach(function (transaction) {
            var dataValues = transaction.dataValues;
            dataValues.oldBalance = Number(parseFloat(dataValues.oldBalance));
            dataValues.newBalance = Number(parseFloat(dataValues.newBalance));
            dataValues.amount = Number(parseFloat(dataValues.amount));
          });
          return _context3.abrupt("return", (0, _helper.successResponse)(res, 200, transactions));

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", (0, _helper.errResponse)(res, 500, _context3.t0.message));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getAnAccountsTransactions = getAnAccountsTransactions;