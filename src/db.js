const { Sequelize } = require('sequelize');
require("dotenv").config();
const CountryModel = require('./models/Country.js');
const ActivityModel = require('./models/Activity.js');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

//?Conexion con la base de datos
const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/countries_e4ce`,
  {
    logging: console.log,
    native: false,
  }
);
  

//! Aca inyecto las tablas(modelos) a la base de datos
CountryModel(database);
ActivityModel(database);

//* Desestructuro los modelos de la base de datos
const { Country, Activity } = database.models;

//? Aca se declaran las relaciones entre los modelos
Country.belongsToMany(Activity, { through: "Country_Activity" });
Activity.belongsToMany(Country, { through: "Country_Activity" });


module.exports = { database, ...database.models }; //? exporto la conexion database y los modelos contenidos en database.models

