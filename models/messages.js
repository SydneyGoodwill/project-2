module.exports = function (sequelize, DataTypes) {
  const Messages = sequelize.define("Messages", {
    chatId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
  });
  Messages.sync();
  return Messages;
};
