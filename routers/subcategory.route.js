//require express 
const express = require ("express")

//use routes from express package
const routes = express.Router()

//require controller from sub category controller 
const  {sendSubData, getSubAll, getSubCatInfo, updateSubCatName, updateSubCatStatus, deleteSubData}  = require("../controllers/subcategory.controller")


//send sub category data 
routes.post("/addSubCat" , sendSubData)

//get all sub category list 
routes.get("/allSubCat",getSubAll )

//get one seb category info by if  
routes.get("/SubCat/:id",getSubCatInfo )

//update sub category name by id 
routes.put("/SubCat/:id",updateSubCatName)

//update sub category status by id 
routes.put("/SubCat/status/:id", updateSubCatStatus)

//delete sub category by id 
routes.delete("/SubCat/:id", deleteSubData)

//exports routesr to other file 
module.exports = routes