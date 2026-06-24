const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registercontroller = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    //check user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(409).send({
        success: false,
        message: "email already registered please login",
      });
    }
    //HASHING PASSWORD
    var salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedpassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register API",
      error,
    });
  }
};

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "please provide email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //check user password | compare password
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).send({
        success: false,
        message: "invalid credentials",
      });
    }

    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //HIDE PASSWORD WHILE USING POSTMAN
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "successfully logged in",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

module.exports = { registercontroller, logincontroller };
