module.exports = function (sequelize, DataTypes) {
  const Chat = sequelize.define("Chat", {
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    title: DataTypes.STRING,
  });
  Chat.sync();
  return Chat;
};
