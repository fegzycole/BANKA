"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transaction = require("../Controller/transaction");

var _Validations = require("../Middleware/Validations");

var _Auth = require("../Middleware/Auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// /* eslint-disable linebreak-style */
var router = _express["default"].Router();

router.post('/:accountNumber/transaction', _Auth.authorizeUser, _Auth.confirmCashier, _Validations.validateCashTransaction, _Auth.checkAccountNumber, _Auth.confirmCashAvailability, _transaction.cashTransaction);
router.get('/:id', _Auth.authorizeUser, _Auth.confirmStaff, _Auth.checkTransactionId, _transaction.getATransaction);
router.get('/:accountNumber/all', _Auth.authorizeUser, _Auth.checkAccountNumber, _Auth.confirmOwner, _transaction.getAnAccountsTransactions);
var _default = router;
exports["default"] = _default;