
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    accountNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    owner: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'owner',
      },
    },
    type: {
      type: Sequelize.ENUM('savings', 'current'),
    },
    status: {
      type: Sequelize.ENUM('draft', 'active', 'dormant'),
      defaultValue: 'draft',
    },
    balance: {
      type: Sequelize.FLOAT,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Accounts'),
};
