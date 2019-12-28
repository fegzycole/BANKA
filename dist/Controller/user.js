"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = exports.oAuth = exports.signUpUser = void 0;

var _models = _interopRequireDefault(require("../models"));

var _helper = require("../helper/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var User = _models["default"].User;

var signUpUser = function signUpUser(req, res) {
  var user, payload;
  return regeneratorRuntime.async(function signUpUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          req.user.isAdmin = false;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.create(req.user));

        case 4:
          user = _context.sent;
          payload = user.getSafeDataValues();
          payload.token = (0, _helper.generateToken)(payload);
          return _context.abrupt("return", (0, _helper.successResponse)(res, 201, payload));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", (0, _helper.errResponse)(res, 500, _context.t0.message));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.signUpUser = signUpUser;

var oAuth = function oAuth(req, res) {
  var oauthId, _ref, _ref2, user, payload;

  return regeneratorRuntime.async(function oAuth$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          oauthId = req.user.oauthId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOrCreate({
            where: {
              oauthId: oauthId
            },
            defaults: req.user
          }));

        case 4:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          user = _ref2[0];
          payload = user.getSafeDataValues();
          payload.token = (0, _helper.generateToken)(payload);
          return _context2.abrupt("return", (0, _helper.successResponse)(res, 201, payload));

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", (0, _helper.errResponse)(res, 500, _context2.t0.message));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.oAuth = oAuth;

var signIn = function signIn(req, res) {
  var payload;
  return regeneratorRuntime.async(function signIn$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          payload = req.user;
          payload.token = (0, _helper.generateToken)(payload);
          return _context3.abrupt("return", (0, _helper.successResponse)(res, 200, payload));

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", (0, _helper.errResponse)(res, 500, _context3.t0.message));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.signIn = signIn;