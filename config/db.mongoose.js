const mongoose = require("mongoose")
require("dotenv").config();

//mongodb se connection try kiya h with error handling mechanism
// try {
//     mongoose.connect(process.env.db);
//   } catch (error) {
//     handleError(error);
// }

//for future use when we will start using mongodb atlas
const username = "Digizest";
const password = "myHome@123";
const cluster = "cluster0";
const dbname = "Zopmata";

mongoose.connect(
  
//  `mongodb+srv://Dizigest:zopmata@cluster0.uymt0.mongodb.net/Zopmata?retryWrites=true&w=majority`
process.env.db
).then(()=>{
  console.log("database connected")
}).catch((err)=>{
  console.log("error",err)
});


module.exports = mongoose.connection