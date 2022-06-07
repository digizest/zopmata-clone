const express = require("express");
const routes = express.Router();
//import auth middileware
const { verificationAuth } = require("../middilewares/auth");

const {
  signUpuser,
  loginUser,
  forgetPassword,
  userExist,
  getListOfUser,
  Signout
} = require("../controllers/user.controller");

//nodemailer

//import controllers
const { userController } = require("../controllers/index");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { route } = require("express/lib/application");
const { otpSend, verifyOtp } = require("../helper/nodemailer");

// /**
//  * @swagger
//  * /:
//  *  get :
//  *      summery : this api is used to check is get methode is working or not
//  *      description : this api is used to check is get methode is working or not
//  *      responses :
//  *          200:
//  *              description: to test get methode
//  */
// // routes.get("/get-user-list" , [ verificationAuth , userController.getListOfUser ])

// /**
//  * @swagger
//  * /:
//  *  post :
//  *      summery : this api is used to check is post methode is working or not
//  *      description : Added succesfully
//  *      requestBody :
//  *           required: true
//  *           content :
//  *               application/json
//  *                  schema :
//  *                      $ref : '#components/schema/user'
//  *      responses :
//  *          200:
//  *              description: to test post methode
//  */
//add user api
routes.post("/sign-up", signUpuser);

//login user api
routes.get("/login", loginUser);

//note : when user found imn db then next page will render otherwise it provide errore
//both are forget password api first page is for check user exist by email or number
//secound page is for update password in email and password two fileds are there
routes.get("/exist", userExist);

//forget password api
routes.post("/password", forgetPassword);

//send otp api
routes.post("/sendotp", otpSend);

//verify otp api
routes.get("/verifyotp", verifyOtp);

//get list of user 
routes.get("/getAllUser", getListOfUser)

routes.get('/signout',Signout);

module.exports = routes;
