//require express 
const express = require ("express")

//use route from express package 
const routes = express.Router()

//require controller from category route 
const  {sendCatData, getAll,  getCatInfo, updateCatName, updateCatStatus, deleteCatData}  = require("../controllers/category.controller")

//send data to category 
routes.post("/addCategory" , sendCatData)

//get all category list 
routes.get("/allCategory",getAll )

//get one category info 
routes.get("/category/:id",getCatInfo )

//update category name via id
routes.put("/category/name/:id",updateCatName)

//update category status via id 
routes.put("/category/status/:id", updateCatStatus)

//delete category via id 
routes.delete("/category/:id", deleteCatData)

//export route 
module.exports = routes