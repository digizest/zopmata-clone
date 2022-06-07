const { Schema, model } = require("mongoose");


const restuarentSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password : {
      type : String,
      required : true
    },
    mobileNumber: [Number],

    otp: {
      type: Number,
      default: 0000,
    },

    token: {
      type: String,
    },

    Role: {
      type: Number,
      default: 0,
    },
    activeStatus: {
      type: String,
      enum: ["active", "disavtive", "blocked by admin", "autoblock"],
      default: "active",
    },

    address_id: [],
  },
  { timestamps: true }
);

const restuarentModel = model("restuarents", restuarentSchema);

module.exports = restuarentModel 
