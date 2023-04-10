const { DataTypes } = require("sequelize");

//? Funcion que recibe la instancia de sequelize
const Activity = (database) => {
  database.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      season: {
        type: DataTypes.ENUM("summer", "autumn", "winter", "spring"),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  
}

module.exports = Activity;