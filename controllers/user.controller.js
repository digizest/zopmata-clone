const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

//Sign Up user
const signUpuser = async (req, res) => {
  const { First_name, Last_name, email, password, mobileNumber } = req.body;

  //Validation
  if (!First_name || !Last_name || !email || !password || !mobileNumber) {
    res.status(400).send("Please include all fields.");
  }

  //Find the user already exists
  const userExists = await userModel.findOne({ email });

  const numberExists = await userModel.findOne({ mobileNumber });

  if (userExists) {
    res.status(400).send("Email already exists");
  } else if (numberExists) {
    res.status(400).send("Number already exists");
  } else {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save user in db
    const user = new userModel({
      First_name,
      Last_name,
      email,
      password: hashedPassword,
      mobileNumber,
      token: "",
    });
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          message: "not able to save user",
          rr: err,
        });
      } else {
        res.json({
          data: user,
        });
      }
    });
  }
};

//login api of user with jwt
const loginUser = async (req, res) => {
  const { mobileNumber, email, password } = req.body;

  const numberExists = await userModel.findOne({ mobileNumber });
  const user = await userModel.findOne({ email });

  const ComparePass = await bcrypt.compare(password, user.password);

  // check user & password match
  if (numberExists || (user && ComparePass)) {
    const token = generateToken(user._id);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    await userModel.updateOne({ _id: user._id }, { $set: { token: token } });
    res.status(200).json({
      _id: user._id,
      name: `${user.First_name} ${user.Last_name}`,
      email: user.email,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    res.status(401).send("Invalid Credentials");
  }
};

//singout user
const Signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout succesfully",
  });
};

//forget password api
const forgetPassword = async (req, res) => {
  const { mobileNumber, email, password } = req.body;

  const numberExists = await userModel.findOne({ mobileNumber });
  const userEmail = await userModel.findOne({ email });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (numberExists || userEmail) {
    await userModel.updateOne(
      { _id: userEmail._id },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({ msg: "Password Updated Succesfully" });
  } else {
    res.status(401).send("Unable to update password");
  }
};

//user exist api
const userExist = async (req, res) => {
  const { email, mobileNumber, password } = req.body;

  const emailExist = await userModel.findOne({ email });

  const numberExist = await userModel.findOne({ mobileNumber });

  if (emailExist || numberExist) {
    return res.status(200).json({ msg: "User Found in DB " });
  } else {
    return res.status(404).json({ msg: "User not exist" });
  }
};

//get all user  list with paggination
const getListOfUser = (req, res) => {
  let page = req.query.pageNo - 1;
  let limit = req.query.limit;
  let skip = page * limit;
  userModel
    .find()
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got all user",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err, msg: "failed to get user" });
    });
};

//get user by id
const getUserById = (req, res) => {
  let id = req.query.id;
  userModel
    .findById(id)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got user",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        msg: "failed to get user",
      });
    });
};

//update user name by id
const updateUser = (req, res) => {
  let userId = req.params.id;
  let { First_name, Last_name } = req.body;
  let dataToUpdate = {
    First_name: First_name,
    Last_name: Last_name,
  };
  //1 where , 2 set : what to update
  userModel.findOneAndUpdate(
    {
      _id: userId,
    },
    dataToUpdate,
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
          msg: "Your request could not be processed. Please try again.",
        });
      } else {
        return res.status(200).json({
          msg: "user has been updated successfully!",
          data: data,
        });
      }
    }
  );
};

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  signUpuser,
  loginUser,
  userExist,
  forgetPassword,
  getListOfUser,
  Signout,
  getUserById,
  updateUser,
};
