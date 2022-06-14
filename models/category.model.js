const mongoose = require("mongoose")
const { Schema , model } = require("mongoose")

let catSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim: true
    },
    activated : {
        type : Boolean,
        default : false
    },
    catCode : {
        type : Number,
        required : true
    },
   


},{ timestamps: true })
//1 collection name , 2 schema object
let catModel = model( "cat" , catSchema )
module.exports = catModel;