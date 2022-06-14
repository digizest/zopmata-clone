const mongoose = require("mongoose")
const { Schema , model } = require("mongoose")

let SubCatSchema = new Schema({
    catId : {
            type: Schema.Types.ObjectId,
            ref: 'cat'
    },
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
    subCatCode : {
        type : Number,
        required : true
    },
    dateCreated : {
        type : Date,
        required : true
    },
    updatedDate :{
        type : Date,
        default : Date.now()
    }

})
//1 collection name , 2 schema object
let subModel = model( "subCat" , SubCatSchema )
module.exports = subModel;