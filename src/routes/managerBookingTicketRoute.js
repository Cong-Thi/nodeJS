const express = require('express');
const managerBookingTicketRoute = express.Router();
const {getInfoTicketRoom,addShowTimeMovie,addBookingTicketMovie} = require('../controllers/managerBookingTicket');
const {verifyToken} = require('../middlewares/baseToken')


// Manager Film 
managerBookingTicketRoute.get("/getInfoTicketRoom/:ma_lich_chieu",verifyToken,getInfoTicketRoom);
managerBookingTicketRoute.post("/addShowTimeMovie",verifyToken,addShowTimeMovie);
managerBookingTicketRoute.post("/addBookingTicketMovie",verifyToken,addBookingTicketMovie);



module.exports = managerBookingTicketRoute;
