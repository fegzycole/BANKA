"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateId = exports.validateCashTransaction = exports.validatestatusChange = exports.validateAccountType = exports.validateSignIn = exports.validateSignup = void 0;

var _validationRules = require("../helper/validationRules");

var _helper = require("../helper/helper");

var validateSignup = function validateSignup(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      password = _req$body.password,
      type = _req$body.type;
  var data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    type: type
  };
  (0, _helper.validate)(data, _validationRules.signup, res, next);
};

exports.validateSignup = validateSignup;

var validateSignIn = function validateSignIn(req, res, next) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;
  var data = {
    email: email,
    password: password
  };
  (0, _helper.validate)(data, _validationRules.signIn, res, next);
};

exports.validateSignIn = validateSignIn;

var validateAccountType = function validateAccountType(req, res, next) {
  var type = req.body.type;
  var data = {
    type: type
  };
  (0, _helper.validate)(data, _validationRules.accountType, res, next);
};

exports.validateAccountType = validateAccountType;

var validatestatusChange = function validatestatusChange(req, res, next) {
  var status = req.body.status;
  var accountNumber = req.params.accountNumber;
  var data = {
    status: status,
    accountNumber: accountNumber
  };
  (0, _helper.validate)(data, _validationRules.changeStatus, res, next);
};

exports.validatestatusChange = validatestatusChange;

var validateCashTransaction = function validateCashTransaction(req, res, next) {
  var _req$body3 = req.body,
      amount = _req$body3.amount,
      type = _req$body3.type;
  var accountNumber = req.params.accountNumber;
  var data = {
    type: type,
    accountNumber: accountNumber,
    amount: amount
  };
  (0, _helper.validate)(data, _validationRules.cashTransaction, res, next);
};

exports.validateCashTransaction = validateCashTransaction;

var validateId = function validateId(req, res, next) {
  var id = req.params.id;
  var data = {
    id: id
  };
  (0, _helper.validate)(data, _validationRules.checkId, res, next);
};

exports.validateId = validateId;