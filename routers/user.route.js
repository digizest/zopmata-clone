const express = require("express");
const routes = express.Router()
//import auth middileware
const { verificationAuth } = require("../middilewares/auth")

const {signUpuser} =require("../controllers/user.controller")

//import controllers
const { userController } = require("../controllers/index")

routes.get("/get-user-list" , [ verificationAuth , userController.getListOfUser ])

routes.post("/sign-up",signUpuser )

module.exports = routes