//create restaurant

const restaurantmodel = require("../models/restaurantmodel");

const createrestaurantcontroller = async (req, res) => {
  try {
    const {
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isopen,
      logourl,
      rating,
      ratingcount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newRestaurant = new restaurantmodel({
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isopen,
      logourl,
      rating,
      ratingcount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New Restaurant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

//get all restaurants
const getallrestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantmodel.find({}).select("title");
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "no restaurant available",
      });
    }
    res.status(200).send({
      success: true,
      totalcount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all restaurant api",
      error,
    });
  }
};

//GET RESTAURANT BY NAME
const getrestaurantbyidcontroller = async (req, res) => {
  try {
    const title = req.params.title;
    const restaurant = await restaurantmodel.findOne({ title }).select("title");
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "restaurant does not exist",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching the restaurant",
      error,
    });
  }
};

//DELETE RESTAURANT
const deleteRestaurantcontroller = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found OR Provide Restaurant ID",
      });
    }
    await restaurantmodel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in delete restaurant api",
      error,
    });
  }
};

//export
module.exports = {
  createrestaurantcontroller,
  getallrestaurants,
  getrestaurantbyidcontroller,
  deleteRestaurantcontroller,
};
