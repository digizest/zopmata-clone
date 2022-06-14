
const addressModel = require('../models/address.model')

//add an address
const addAddress = (req , res)=>{
    
let doc = new addressModel (req.body)
doc.save().then((data)=>{
    console.log("then inside");
    return res.json({result : data , msg : "address added"})
}).catch((err)=>{
    console.log("catch inside");
    return res.send({ msg : "something went wrong" , error : err})})
}




module.exports = addAddress