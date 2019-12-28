"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

module.exports = function (sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cashier: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    oldBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    newBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('credit', 'debit'),
      allowNull: false
    }
  });

  Transaction.prototype.getSafeDataValues = function getSafeDataValues() {
    var data = _extends({}, this.dataValues);

    return data;
  };

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Account, {
      foreignKey: 'accountNumber',
      targetKey: 'accountNumber',
      onDelete: 'CASCADE'
    });
  };

  return Transaction;
};