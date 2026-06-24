const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "user type is required"],
    },
    userType: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    Profile: {
      type: String,
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  { timestamps: true },
);

//export
// const user = mongoose.model("user", userSchema);
// module.exports = user;

//OR

module.exports = mongoose.model("user", userSchema);
