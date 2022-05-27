const express = require("express");
const routes = express.Router()

//import controllers
const { userController } = require("../controllers/index")

routes.get("/get-user-list" , userController.getListOfUser )

module.exports = routes