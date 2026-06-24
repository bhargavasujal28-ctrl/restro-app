const express = require("express");
const {
  createrestaurantcontroller,
  getallrestaurants,
  getrestaurantbyidcontroller,
  deleteRestaurantcontroller,
} = require("../controllers/restaurantcontrollers");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

//routes
router.post("/create", createrestaurantcontroller);

//GET ALL RESTAURANTS
router.get("/getall", getallrestaurants);

//get restaurant by NAME
router.get("/get/:title", getrestaurantbyidcontroller);

// DELETE RESTaURANT || DELETE
router.delete("/delete/:id", authmiddleware, deleteRestaurantcontroller);

//export
module.exports = router;
