const express = require("express");
const {
  createrestaurantcontroller,
  getallrestaurants,
  getrestaurantbyidcontroller,
} = require("../controllers/restaurantcontrollers");

const router = express.Router();

//routes
router.post("/create", createrestaurantcontroller);

//GET ALL RESTAURANTS
router.get("/getall", getallrestaurants);

//get restaurant by NAME
router.get("/get/:title", getrestaurantbyidcontroller);

//export
module.exports = router;
