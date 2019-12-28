'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cashier: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('credit', 'debit')
      },
      oldBalance: {
        type: Sequelize.FLOAT
      },
      newBalance: {
        type: Sequelize.FLOAT
      },
      amount: {
        type: Sequelize.FLOAT
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Accounts',
          key: 'accountNumber',
          as: 'accountNumber',
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};