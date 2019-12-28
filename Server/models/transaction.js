module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cashier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oldBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    newBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('credit', 'debit'),
      allowNull: false
    },
  });

  Transaction.prototype.getSafeDataValues = function getSafeDataValues() {
    const { ...data } = this.dataValues;
    return data;
  };

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Account, {
      foreignKey: 'accountNumber',
      targetKey:'accountNumber',
      onDelete: 'CASCADE',
    });
  };

  return Transaction;
};