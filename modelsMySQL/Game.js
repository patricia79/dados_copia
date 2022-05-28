module.exports = (sequelize, type) => {
    return sequelize.define('games', {
        idGames: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dice1: {
            type: type.INTEGER,
        allowNull: false
        },
        dice2: {
            type: type.INTEGER,
            allowNull: false},
        
      result: {
        type: type.INTEGER,
        allowNull: false},
    
      score: {
        type: type.BOOLEAN,
        allowNull: false},
  
       })}

       Player.hasMany(Game,{onDelete:'cascade'}) 
       Game.belongsTo(Player)