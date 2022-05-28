module.exports = (sequelize, type) => {
  return sequelize.define("player", {
    idPlayer: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    namePlayer: {
      type: type.STRING,
      allowNull: false,
    },
    registerDate: {
      type: type.DATE,
      allowNull: false,
    }
  });
};
