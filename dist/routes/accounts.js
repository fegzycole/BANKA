"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _account = require("../Controller/account");

var _Validations = require("../Middleware/Validations");

var _Auth = require("../Middleware/Auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _Auth.authorizeUser, _Auth.checkUserAccountType, _Validations.validateAccountType, _account.createAccount);
router.patch('/:accountNumber', _Auth.authorizeUser, _Auth.confirmAdmin, _Validations.validatestatusChange, _Auth.checkAccountNumber, _account.editAccountStatus);
router["delete"]('/:accountNumber', _Auth.authorizeUser, _Auth.confirmAdmin, _Auth.checkAccountNumber, _account.deleteAccount);
router.get('/:accountNumber', _Auth.authorizeUser, _Auth.checkAccountNumber, _account.getAnAccount);
router.get('/', _Auth.authorizeUser, _Auth.confirmStaff, _account.getAllAccounts);
router.get('/:id/all', _account.getUserAccounts); // router.delete('/:accountNo', verifyTokenAll, staffToken, deleteAnAccount);

var _default = router;
exports["default"] = _default;