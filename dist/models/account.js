"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('savings', 'current'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'dormant'),
      defaultValue: 'draft'
    }
  });

  Account.prototype.getSafeDataValues = function getSafeDataValues() {
    var data = _extends({}, this.dataValues);

    return data;
  };

  Account.associate = function (models) {
    Account.belongsTo(models.User, {
      foreignKey: 'owner',
      onDelete: 'CASCADE'
    });
  };

  Account.associate = function (models) {
    Account.hasMany(models.Transaction, {
      foreignKey: 'accountNumber',
      sourceKey: 'accountNumber',
      as: 'transactions'
    });
  };

  return Account;
};