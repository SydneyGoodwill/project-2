module.exports = function (sequelize, DataTypes) {
  const Highscore = sequelize.define("Highscore", {
    userId: DataTypes.INTEGER,
    initials: DataTypes.STRING,
    score: DataTypes.INTEGER,
    gameID: DataTypes.STRING,
  });
  Highscore.sync();
  return Highscore;
};
