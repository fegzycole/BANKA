import { genSaltSync, hashSync } from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oauthId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('customer', 'cashier', 'admin'),
      defaultValue: 'customer',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email field must be an email.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    hooks: {
      beforeSave: (user) => {
        if (user.changed('password')) {
          const salt = genSaltSync(10);
          // eslint-disable-next-line no-param-reassign
          user.password = hashSync(user.password, salt);
        }
      },
    },
    timestamps: true,
  });

  User.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, oauthId, ...data } = this.dataValues;
    return data;
  };

  User.associate = (models) => {
    User.hasMany(models.Account, {
      foreignKey: 'owner',
      as: 'accounts',
    });
  };


  return User;
};
