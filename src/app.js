//? Aqui creo el servidor y lo exporto

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const countryRouter = require('./routes/countryRouter.js');
const activityRouter = require('./routes/activityRouter.js');

const server = express();


//!Middlewares

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use("/countries", countryRouter);
server.use("/activities", activityRouter);

module.exports = server;