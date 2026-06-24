const express = require("express");
const {
  getusercontroller,
  updateusercontroller,
  resetpasswordcontroller,
  deleteusercontroller,
} = require("../controllers/usercontroller");
const { route } = require("./testRoutes");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

//routes
// GET USER || GET-METHOD
router.get("/getuser", authmiddleware, getusercontroller);

//UPDATE PROFILE
router.put("/updateuser", authmiddleware, updateusercontroller);

//RESET PASSWORD
router.post("/resetpassword", authmiddleware, resetpasswordcontroller);

//DELETE USER
router.delete("/deleteuser/:id", authmiddleware, deleteusercontroller);

module.exports = router;
