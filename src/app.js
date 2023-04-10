//? Aqui creo el servidor y lo exporto
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const countryRouter = require('./routes/countryRouter.js');
const activityRouter = require('./routes/activityRouter.js');

const server = express();
const { CORS_OPTION } = process.env;

//!Middlewares

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({ origin: CORS_OPTION }));
server.use("/countries", countryRouter);
server.use("/activities", activityRouter);

module.exports = server;