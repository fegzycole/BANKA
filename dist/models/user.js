"use strict";

var _bcryptjs = require("bcryptjs");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    oauthId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('customer', 'cashier', 'admin'),
      defaultValue: 'customer'
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email field must be an email.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeSave: function beforeSave(user) {
        if (user.changed('password')) {
          var salt = (0, _bcryptjs.genSaltSync)(10); // eslint-disable-next-line no-param-reassign

          user.password = (0, _bcryptjs.hashSync)(user.password, salt);
        }
      }
    },
    timestamps: true
  });

  User.prototype.getSafeDataValues = function getSafeDataValues() {
    var _this$dataValues = this.dataValues,
        password = _this$dataValues.password,
        oauthId = _this$dataValues.oauthId,
        data = _objectWithoutProperties(_this$dataValues, ["password", "oauthId"]);

    return data;
  };

  User.associate = function (models) {
    User.hasMany(models.Account, {
      foreignKey: 'owner',
      as: 'accounts'
    });
  };

  return User;
};