const express = require("express");
const routes = express.Router()
//import auth middileware
const { verificationAuth } = require("../middilewares/auth")

//import controllers
const { userController } = require("../controllers/index")

routes.get("/get-user-list" , [ verificationAuth , userController.getListOfUser ])

module.exports = routes