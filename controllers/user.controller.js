const { userModel } = require("../models/user.model")
const bcrypt = require('bcrypt')


const user = [{ name : "asdcw"},{ name : "qweer"},{ name : "abcd"}]


//Sign Up user
const signUpuser = async (req,res) => {

    const { First_name, Last_name , email , password ,mobileNumber} = req.body;
  
    //Validation
    if (!First_name|| !Last_name|| !email || !password || !mobileNumber ) {
      res.status(400).send("Please include all fields.");
    }

    //Find the user already exists
    const userExists = await userModel.findOne({email});
    if (userExists) {
      res.status(400).send("User already exists");
    }

     // hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

 const user = new userModel({
    First_name,
    Last_name,
    email,
    password : hashedPassword,
    mobileNumber
 });
 user.save((err,user)=>{
     if(err){
        return res.status(400).json({
            message:"not able to save user",
            rr : err
        })
     }else{
         console.log("user",user)
        res.json({
            data : user
        });
     }
 })

}





//controller 1
const getListOfUser = (req , res)=>{
    console.log(userModel)
    return res.status(200).send(user)
}

module.exports = { getListOfUser, signUpuser}