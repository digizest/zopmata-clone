const mongoose = require("mongoose")
//mongodb se connection try kiya h with error handling mechanism
try {
    mongoose.connect('mongodb://localhost:27017/test');
  } catch (error) {
    handleError(error);
}

//for future use when we will start using mongodb atlas
// const username = "<mongodb username>";
// const password = "<password>";
// const cluster = "<cluster name>";
// const dbname = "myFirstDatabase";

// mongoose.connect(
//   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );


module.exports = mongoose.connection