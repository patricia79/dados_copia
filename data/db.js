const mysql = require("mysql2");
const Sequelize = require("sequelize");
const config_db = require("../config");
const sequelize = new Sequelize(
  config_db.database,
  config_db.user,
  config_db.password,
  { dialect: "mysql" }
);

async function connectMySQL() {
  const connection = mysql.createConnection({
    host: config_db.host,
    user: config_db.user,
    password: config_db.password,
  });
  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${config_db.database}\`;`,
    (err, result) => {
      if (err) throw err;
      sequelize
        .sync()
        .then(() => console.log("Synchronized tables"))
        .catch((error) => console.log("Has occurred an error", error));
    }
  );
  connection.end();
}

const Roll = sequelize.define(
  "Roll", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dice1: {
      type: Sequelize.INTEGER,
    },
    dice2: {
      type: Sequelize.INTEGER,
    },
    resultScore: {
      type: Sequelize.INTEGER,
    },
    result: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Player = sequelize.define(
  "player",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    totalGames: {  

      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    totalWins: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    winRate: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: "data",
  }
);

Player.hasMany(Roll, { onDelete: "cascade" });
Roll.belongsTo(Player);

module.exports = {
  Player,
  Roll,
  sequelize,
  connectMySQL,
};
