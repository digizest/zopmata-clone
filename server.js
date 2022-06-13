const express = require("express");
const app = express();
const mongooseDB = require("./config/db.mongoose")


//import routes 
const userRoutes = require("./routers/user.route")
const restaurantRoutes = require('./routers/restuarent.route')

//for loggin module imports
const morgan = require('morgan')
const winston = require('winston')
//for swagger api documentation
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
//import costum middileware
const { dummymiddileware } = require("./middilewares/index") 



//connectivity check with mongodb database
//connection par error ane pr y line clegy
mongooseDB.on("error", console.error.bind(console, "connection error: "));
//connection success hone par y line clegy
mongooseDB.once("open", function () {
  console.log("Mongodb database Connected successfully"  );
});


//attech pre defined middilewares
app.use(express.json());//as a body parser
app.use(morgan('dev'))//for http request logging
//attech swagger as a middileware
const options = {
    definition: {
        openapi : "3.0.0",
        info : {
            title : "Library Api",
            version : "1.0.0",
            description : "zopmata" 
        },
        servers : [
            {
                url : "http://localhost:8080"
            }
        ]
    },
    apis : ['./routers/user.route.js']
}

const spec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve , swaggerUi.setup(spec))
//attech custum middilewares
app.use(dummymiddileware)





//attech all the apis routes
app.use("/v1/user" , userRoutes )
app.use('/v1/restaurant',restaurantRoutes)
//API: for testing absolute path
//just hit the below path and see the magic
//localhost:8080/


//get api 

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
app.get("/test",(req , res )=>{
    res.status(200).send("Hellow World of ZOPMATA!")
})

//server config and running steps
const portNumber = 8080 || process.env.PORT;
app.listen(portNumber , (err)=>{
    if(err)
    {
        console.log(`==================server running failed due to err at ${ new Date() }=============`)
        console.log(err)
    }else{
        console.log("server is up and running at port number " , portNumber)
    }
})