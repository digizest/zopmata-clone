const express = require("express");
const app = express();

//attech pre defined middilewares
app.use(express.json());

//attech custum middilewares

//API: for testing absolute path
//just hit the below path and see the magic
//localhost:8080/
app.get("/",(req , res )=>{
    res.status(200).send("Hellow World of ZOPMATA!")
})

//server config and running steps
const portNumber = 8080;
app.listen(portNumber , (err)=>{
    if(err)
    {
        console.log(`==================server running failed due to err at ${ new Date() }=============`)
        console.log(err)
    }else{
        console.log("server is up and running at port number " , portNumber)
    }
})