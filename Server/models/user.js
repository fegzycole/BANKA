const { genSaltSync, hashSync } = require('bcryptjs');

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeSave: (user) => {
        const newUser = user;
        if (user.changed('password')) {
          const salt = genSaltSync(10);
          newUser.password = hashSync(user.password, salt);
        }
      },
    },
    timestamps: true,
  });
  // User.associate = (models)  => {
  //   // associations can be defined here
  // };
  return User;
};
