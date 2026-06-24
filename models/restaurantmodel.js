const mongoose = require("mongoose");

//SCHEMA
const restaurantschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "restaurant title is required"],
    },
    imageurl: {
      type: String,
      default: "",
    },
    foods: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isopen: {
      type: Boolean,
      default: true,
    },
    logourl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingcount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      title: { type: String },
    },
  },
  { timestamps: true },
);

//export
module.exports = mongoose.model("restaurant", restaurantschema);
