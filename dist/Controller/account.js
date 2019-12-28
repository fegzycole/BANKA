"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserAccounts = exports.getAllAccounts = exports.getAnAccount = exports.deleteAccount = exports.editAccountStatus = exports.createAccount = void 0;

var _helper = require("../helper/helper");

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Account = _models["default"].Account,
    Transaction = _models["default"].Transaction;

var createAccount = function createAccount(req, res) {
  var id, type, accountNumber, newAccount, _ref, dataValues;

  return regeneratorRuntime.async(function createAccount$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.decoded.id;
          type = req.body.type;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _helper.generateAccountNumber)());

        case 5:
          accountNumber = _context.sent;
          newAccount = {
            owner: id,
            status: 'draft',
            balance: parseFloat(0.00),
            type: type,
            accountNumber: accountNumber
          };
          _context.next = 9;
          return regeneratorRuntime.awrap(Account.create(newAccount));

        case 9:
          _ref = _context.sent;
          dataValues = _ref.dataValues;
          return _context.abrupt("return", (0, _helper.successResponse)(res, 201, dataValues));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", (0, _helper.errResponse)(res, 500, _context.t0.message));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.createAccount = createAccount;

var editAccountStatus = function editAccountStatus(req, res, next) {
  var status, account, dataValues;
  return regeneratorRuntime.async(function editAccountStatus$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          status = req.body.status;
          account = req.account;
          _context2.next = 5;
          return regeneratorRuntime.awrap(account.update({
            status: status
          }));

        case 5:
          dataValues = account.dataValues;
          return _context2.abrupt("return", (0, _helper.successResponse)(res, 200, dataValues));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", (0, _helper.errResponse)(res, 500, _context2.t0.message));

        case 12:
          ;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.editAccountStatus = editAccountStatus;

var deleteAccount = function deleteAccount(req, res, next) {
  var accountNumber, account;
  return regeneratorRuntime.async(function deleteAccount$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          accountNumber = req.params.accountNumber;
          account = req.account;
          _context3.next = 5;
          return regeneratorRuntime.awrap(account.destroy({
            accountNumber: accountNumber
          }));

        case 5:
          return _context3.abrupt("return", (0, _helper.successResponse)(res, 200, 'Bank account successfully deleted'));

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", (0, _helper.errResponse)(res, 500, _context3.t0.message));

        case 11:
          ;

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.deleteAccount = deleteAccount;

var getAnAccount = function getAnAccount(req, res, next) {
  var account, dataValues;
  return regeneratorRuntime.async(function getAnAccount$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          account = req.account;
          dataValues = account.dataValues;
          dataValues.balance = Number(parseFloat(dataValues.balance));
          return _context4.abrupt("return", (0, _helper.successResponse)(res, 200, dataValues));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", (0, _helper.errResponse)(res, 500, _context4.t0.message));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAnAccount = getAnAccount;

var getAllAccounts = function getAllAccounts(req, res, next) {
  var accounts;
  return regeneratorRuntime.async(function getAllAccounts$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Account.findAll());

        case 3:
          accounts = _context5.sent;
          accounts.forEach(function (account) {
            var dataValues = account.dataValues;
            dataValues.balance = Number(parseFloat(dataValues.balance));
          });
          return _context5.abrupt("return", (0, _helper.successResponse)(res, 200, accounts));

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", (0, _helper.errResponse)(res, 500, _context5.t0.message));

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllAccounts = getAllAccounts;

var getUserAccounts = function getUserAccounts(req, res, next) {
  var id, accounts;
  return regeneratorRuntime.async(function getUserAccounts$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Account.findAll({
            where: {
              owner: id
            },
            include: [{
              model: Transaction,
              as: 'transactions'
            }]
          }));

        case 4:
          accounts = _context6.sent;
          accounts.forEach(function (account) {
            var dataValues = account.dataValues;
            dataValues.balance = Number(parseFloat(dataValues.balance));
          });
          return _context6.abrupt("return", (0, _helper.successResponse)(res, 200, accounts));

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", (0, _helper.errResponse)(res, 500, _context6.t0.message));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getUserAccounts = getUserAccounts;