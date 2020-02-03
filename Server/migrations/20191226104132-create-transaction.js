
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    cashier: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.ENUM('credit', 'debit'),
    },
    oldBalance: {
      type: Sequelize.FLOAT,
    },
    newBalance: {
      type: Sequelize.FLOAT,
    },
    amount: {
      type: Sequelize.FLOAT,
    },
    accountNumber: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Accounts',
        key: 'accountNumber',
        as: 'accountNumber',
      },
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Transactions'),
};
