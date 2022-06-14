// const mongoose = require ('mongoose')

const { default: mongoose } = require('mongoose')
const { Schema , model } = require('mongoose')


const addressSchema = new Schema({
    city : {
        type : String ,
        required : true,
    },
    pinCode : {
        type : Number,
        },
    area  : {
        type : String,
        required : true
    },landmark:{
        type : String
    },
    state : {
        type : String,
        required: true
    },
    country : {
        type : String,
        required : true
    },
    countryCode  : {
        type : String , 
        required : true
    },
    isPermanent : {
        type : Boolean,
        required : true
    },

})



let addressModel = model("address" , addressSchema)

module.exports= addressModel