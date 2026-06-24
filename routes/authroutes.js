const express = require("express");
const {
  registercontroller,
  logincontroller,
} = require("../controllers/authcontrollers");
const router = express.Router();

//REGISTER || POST
router.post("/register", registercontroller);

//LOGIN || POST
router.post("/login", logincontroller);

module.exports = router;
