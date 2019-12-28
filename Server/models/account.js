module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('savings', 'current'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'dormant'),
      defaultValue: 'draft',
    },
  });

  Account.prototype.getSafeDataValues = function getSafeDataValues() {
    const { ...data } = this.dataValues;
    return data;
  };

  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      foreignKey: 'owner',
      onDelete: 'CASCADE',
    });
  };

  Account.associate = (models) => {
    Account.hasMany(models.Transaction, {
      foreignKey: 'accountNumber',
      as: 'transactions',
    });
  };

  return Account;
};