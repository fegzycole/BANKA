"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkId = exports.cashTransaction = exports.changeStatus = exports.accountType = exports.signIn = exports.signup = void 0;
var signup = {
  email: 'required|email',
  firstName: 'required|string|alpha|min:2',
  lastName: 'required|string|alpha|min:2',
  password: 'required|string|alpha_num|min:5',
  type: ['required', {
    "in": ['admin', 'cashier', 'customer']
  }]
};
exports.signup = signup;
var signIn = {
  email: 'required|email',
  password: 'required|string'
};
exports.signIn = signIn;
var accountType = {
  type: ['required', {
    "in": ['current', 'savings']
  }]
};
exports.accountType = accountType;
var changeStatus = {
  accountNumber: 'required|integer',
  status: ['required', {
    "in": ['active', 'dormant']
  }]
};
exports.changeStatus = changeStatus;
var cashTransaction = {
  accountNumber: 'required|integer',
  type: ['required', {
    "in": ['credit', 'debit']
  }],
  amount: 'required|numeric|min:0'
};
exports.cashTransaction = cashTransaction;
var checkId = {
  id: 'required|integer'
};
exports.checkId = checkId;