const restuarentModel = require("../models/restaurant.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//get all user  list with paggination
const getListOfRestuarents = (req, res) => {
  let page = req.query.pageNo - 1;
  let limit = req.query.limit;
  let skip = page * limit;
  restuarentModel
    .find()
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully get restuarent data",
        result: data,
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: err, msg: "failed to restuarent data" });
    });
};

//register a restuarent
const registerRestuarent = async (req, res) => {
  const { restaurantName, firstName, lastName, email, password, mobileNumber } =
    req.body;

  if (
    !restaurantName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !mobileNumber
  ) {
    res.status(400).send("Please include all fields.");
  } else {
    //Find the restuarent already exists
    const restuarentExist = await restuarentModel.findOne({ email });

    const restuarentMExist = await restuarentModel.findOne({ mobileNumber });

    if (restuarentExist) {
      res.status(400).send("Email already exists");
    } else if (restuarentMExist) {
      res.status(400).send("Number already exists");
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //save user in db
      const restaurant = new restuarentModel({
        restaurantName,
        ownerName: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        mobileNumber,
        token: "",
      });
      restaurant.save((err, user) => {
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
  }
};

//get restuarent by id
const getRestuarentById = (req, res) => {
  let id = req.query.id;
  restuarentModel
    .findById(id)
    .then((data) => {
      return res.status(200).json({
        total: data.length,
        msg: "successfully got restuarent",
        result: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        msg: "failed to get restuarent",
      });
    });
};

//restuarent login
const loginRestuarent = async (req, res) => {
  const { mobileNumber, email, password } = req.body;

  const numberExists = await restuarentModel.findOne({ mobileNumber });
  const restaurant = await restuarentModel.findOne({ email });

  const ComparePass = await bcrypt.compare(password, restaurant.password);

  // check user & password match
  if (numberExists || (restaurant && ComparePass)) {
    const token = generateToken(restaurant._id);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    await restuarentModel.updateOne(
      { _id: restaurant._id },
      { $set: { token: token } }
    );

    res.status(200).json({
      _id: restaurant._id,
      ownerName: restaurant.ownerName,
      email: restaurant.email,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    res.status(401).send("Invalid Credentials");
  }
};

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//signout restuarent
const Signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout succesfully",
  });
};

//update restuarent
const updateRestuarent = (req, res) => {
  let userId = req.params.id;
  let { restaurantName, ownerName } = req.body;
  let dataToUpdate = {
    restaurantName: restaurantName,
    ownerName: ownerName,
  };
  //1 where , 2 set : what to update
  restuarentModel.findOneAndUpdate(
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
          msg: "restuarent has been updated successfully!",
          data: data,
        });
      }
    }
  );
};



module.exports = {
  getListOfRestuarents,
  registerRestuarent,
  getRestuarentById,
  loginRestuarent,
  Signout,
  updateRestuarent
};
