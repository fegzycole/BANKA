"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable camelcase */

/* eslint-disable no-underscore-dangle */
var performCallback = function performCallback(accessToken, refreshToken, profile, done) {
  var id, provider, given_name, family_name, _profile$_json, first_name, last_name, name, user, _name$split, _name$split2, firstName, lastName;

  return regeneratorRuntime.async(function performCallback$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = profile.id, provider = profile.provider, given_name = profile.given_name, family_name = profile.family_name;
          _profile$_json = profile._json, first_name = _profile$_json.first_name, last_name = _profile$_json.last_name, name = _profile$_json.name;
          user = {
            oauthId: id.toString(),
            password: "".concat(Date.now()).concat(process.env.SECRET),
            isAdmin: false,
            type: 'customer'
          };
          _context.t0 = provider;
          _context.next = _context.t0 === 'facebook' ? 6 : _context.t0 === 'twitter' ? 9 : 13;
          break;

        case 6:
          user.firstName = first_name;
          user.lastName = last_name;
          return _context.abrupt("break", 16);

        case 9:
          // eslint-disable-next-line no-case-declarations
          _name$split = name.split(' '), _name$split2 = _slicedToArray(_name$split, 2), firstName = _name$split2[0], lastName = _name$split2[1];
          user.firstName = firstName;
          user.lastName = lastName;
          return _context.abrupt("break", 16);

        case 13:
          user.firstName = given_name;
          user.lastName = family_name;
          return _context.abrupt("break", 16);

        case 16:
          return _context.abrupt("return", done(null, user));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = performCallback;
exports["default"] = _default;