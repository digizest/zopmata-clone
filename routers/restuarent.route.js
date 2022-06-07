const express = require("express");
const {registerRestuarent, getRestuarentById, getListOfRestuarents , loginRestuarent} = require('../controllers/restaurant.controller')



const routes = express.Router();

//register restuarent
routes.post('/register',registerRestuarent);

//get restuarent by id 
routes.get('/getRestuarentById' , getRestuarentById)

//get all restuarents 
routes.get('/getAllRestuarents' , getListOfRestuarents)

//restuarent login 
routes.post("/loginRestuarent" , loginRestuarent)

//

module.exports = routes;