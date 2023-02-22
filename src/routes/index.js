const express = require('express');
const rootRoute = express.Router();
const userRoute = require('./userRoute');
const managerUser = require('./managerUserRoute');
const managerFilmRoute = require('./managerFilmRoute');
const managerMovieTheaterRoute = require('./managerMovieTheaterRoute');
const managerBookingTicketRoute = require('./managerBookingTicketRoute');

rootRoute.use("/user", userRoute);
rootRoute.use("/managerUser", managerUser);
rootRoute.use("/managerFilm", managerFilmRoute);
rootRoute.use("/managerMovieTheaterRoute", managerMovieTheaterRoute);
rootRoute.use("/managerBookingTicketRoute", managerBookingTicketRoute);


module.exports = rootRoute;

