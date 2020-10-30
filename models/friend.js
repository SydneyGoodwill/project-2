module.exports = function (sequelize, DataTypes) {
  const Friends = sequelize.define("Friends", {
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    actionUserId: DataTypes.INTEGER,
  });
  Friends.sync();
  return Friends;
};
