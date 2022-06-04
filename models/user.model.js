
const { Schema, model } = require("mongoose");


const userSchema = new Schema({
 First_name: {
    type: String,
    required: true,
  },

  Last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique : true
  },

  password: {
    type: String,
    required: true,
  },

  mobileNumber: [Number],

  otp: [
     Number,
],

token : {
  type: String,
},

  profileUrl: {
      type : Array,
      default : []
  },

  Role : {
    type : Number,
    default : 0
  },

  subscription : {
      type : String,
    enum: ['normalUser', 'primeUser',  'goldUser', 'yearlyMerbership', 'halfYearlyMembership', 'quarterlyMembership'],
    default : 'normalUser'

  },
  
  status : {
type : String,
enum : ['active','disabled','blocked by admin','autoblock'],
default : 'active'
// autoblock : when wrong otp entered 3 times or any suspicious activity done.
  },

  currentLocation : {
      latitude :{
       type : Number
      },
      longitude : {
          type : Number,
          
      }  
  },

  // customer id will be unique by uuid.
  customer_id : String ,
  

  address_id : [],

  walletAmount : {
      type : Number,
      default : 0
  }
  
},{timestamps: true});

const userModel = model("users", userSchema);

module.exports = { userModel };
