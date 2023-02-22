const express = require('express');
const managerFilmRoute = express.Router();
const {getBanner,getFilm,getSearchNameFilm,getSearchDateFilm,addFilm,updateFilm ,getFilmDevidePage} = require('../controllers/managerFilm');
const {verifyToken} = require('../middlewares/baseToken')

// Manager Film 
managerFilmRoute.get("/getBanner",verifyToken,getBanner);
managerFilmRoute.get("/getFilm",verifyToken,getFilm);
managerFilmRoute.get("/getSearchNameFilm",verifyToken,getSearchNameFilm);
managerFilmRoute.get("/getSearchDateFilm",verifyToken,getSearchDateFilm);
managerFilmRoute.post("/addFilm",verifyToken,addFilm);
managerFilmRoute.put("/updateFilm/:ma_phim",verifyToken,updateFilm);
managerFilmRoute.get("/getFilmDevidePage",verifyToken,getFilmDevidePage);


module.exports = managerFilmRoute;
