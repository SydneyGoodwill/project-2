/* eslint-disable prettier/prettier */
module.exports = function (sequelize, DataTypes) {
  const Authenticate = sequelize.define("authenticate", {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  Authenticate.sync();
  return Authenticate;
};
