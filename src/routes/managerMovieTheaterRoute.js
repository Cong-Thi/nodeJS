const express = require('express');
const managerMovieTheaterRoute = express.Router();
const {getInfoTheater,getInfoTheaterCluster,getInfoShowTimeMovie,getInfoShowTimeMovieOfCodeFilm} = require('../controllers/managerMovieTheater');
const {verifyToken} = require('../middlewares/baseToken')


// Manager Film 
managerMovieTheaterRoute.get("/getInfoTheater",verifyToken,getInfoTheater);
managerMovieTheaterRoute.get("/getInfoTheaterCluster/:ma_he_thong_rap",verifyToken,getInfoTheaterCluster);
managerMovieTheaterRoute.get("/getInfoShowTimeMovie/:ma_cum_rap",verifyToken,getInfoShowTimeMovie);
managerMovieTheaterRoute.get("/getInfoShowTimeMovieOfCodeFilm/:ma_phim",verifyToken,getInfoShowTimeMovieOfCodeFilm);




module.exports = managerMovieTheaterRoute;
