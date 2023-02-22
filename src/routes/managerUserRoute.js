const express = require('express');
const managerUser = express.Router();
const {getInfoUser,getFullInfoUser,getNameUser,getListInfoUser,addUser,updateUser,deleteUser ,getUserDevidePage} = require('../controllers/managerUser');
const {verifyToken} = require('../middlewares/baseToken')

// managerUser
managerUser.get("/getInfoUser",verifyToken,getInfoUser);
managerUser.get("/getFullInfoUser",verifyToken,getFullInfoUser);
managerUser.get("/getNameUser",verifyToken,getNameUser);
managerUser.get("/getListInfoUser",verifyToken,getListInfoUser);
managerUser.get("/getUserDevidePage",verifyToken,getUserDevidePage);

managerUser.post("/addUser",verifyToken,addUser);
managerUser.put("/updateUser/:id",verifyToken,updateUser);
managerUser.delete("/deleteUser/:id",verifyToken,deleteUser);


module.exports = managerUser;