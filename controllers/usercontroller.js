// GET USER INFO

const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getusercontroller = async (req, res) => {
  try {
    //FIND USER
    console.log("req.user:", req.user);
    const user = await userModel.findById(req.user);
    //VALIDATION
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // HIDE PASSWORD
    user.password = undefined;
    //resp
    res.status(200).send({
      success: true,
      message: "got user successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get user api",
      error,
    });
  }
};

//update user
const updateusercontroller = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById(req.user);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //UPDATE
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in updating user api",
      error,
    });
  }
};

const resetpasswordcontroller = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body;
    if (!email || !newpassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found or invalid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedpassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in password reset api",
      error,
    });
  }
};

const deleteusercontroller = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "ur account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete profile api",
    });
  }
};

module.exports = {
  getusercontroller,
  updateusercontroller,
  resetpasswordcontroller,
  deleteusercontroller,
};
