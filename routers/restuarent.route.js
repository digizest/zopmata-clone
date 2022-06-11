const express = require("express");
const {
  registerRestuarent,
  getRestuarentById,
  getListOfRestuarents,
  loginRestuarent,
  Signout,
  updateRestuarent,
} = require("../controllers/restaurant.controller");

const routes = express.Router();

//register restuarent
routes.post("/register", registerRestuarent);

//get restuarent by id
routes.get("/getRestuarentById", getRestuarentById);

//get all restuarents
routes.get("/getAllRestuarents", getListOfRestuarents);

//restuarent login
routes.post("/loginRestuarent", loginRestuarent);

//singout restaurent
routes.get('/signout',Signout)

//update restuarent
routes.put("uodateRestuarent" , updateRestuarent)

module.exports = routes;
