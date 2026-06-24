const express = require("express");

const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", authmiddleware, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/update/:id", authmiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authmiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authmiddleware, placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authmiddleware,
  adminMiddleware,
  orderStatusController,
);

module.exports = router;
