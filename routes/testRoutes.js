const express = require("express");
const { testusercontroller } = require("../controllers/testcontrollers");

// console.log("testusercontroller =", testusercontroller);
//router object
const router = express.Router();

//routes GET | POST | UPDATE | DELETE
router.get("/test-user", testusercontroller);

//export
module.exports = router;
