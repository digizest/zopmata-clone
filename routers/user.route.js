const express = require("express");
const routes = express.Router()
//import auth middileware
const { verificationAuth } = require("../middilewares/auth")

const {signUpuser,loginUser , forgetPassword , userExist} =require("../controllers/user.controller")

//import controllers
const { userController } = require("../controllers/index")
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc");
const { route } = require("express/lib/application");

/**
 * @swagger
 * /:
 *  get :
 *      summery : this api is used to check is get methode is working or not
 *      description : this api is used to check is get methode is working or not
 *      responses : 
 *          200:
 *              description: to test get methode 
 */
// routes.get("/get-user-list" , [ verificationAuth , userController.getListOfUser ])

/**
 * @swagger
 * /:
 *  post :
 *      summery : this api is used to check is post methode is working or not
 *      description : Added succesfully
 *      requestBody :
 *           required: true
 *           content :
 *               application/json
 *                  schema :
 *                      $ref : '#components/schema/user'
 *      responses :
 *          200:
 *              description: to test post methode
 */
routes.post("/sign-up",signUpuser )
routes.get("/login",loginUser)

//note : when user found imn db then next page will render otherwise it provide errore
//both are forget password api first page is for check user exist by email or number
//secound page is for update password in email and password two fileds are there 
routes.get("/exist" , userExist)
routes.post("/password" , forgetPassword)

module.exports = routes