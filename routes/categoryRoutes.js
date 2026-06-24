const express = require("express");

const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");
const authmiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
// CREATE CAT
router.post("/create", authmiddleware, createCatController);

//GET ALL CAT
router.get("/getAll", getAllCatController);

// UPDATE CAT
router.put("/update/:id", authmiddleware, updateCatController);

// DLEETE CAT
router.delete("/delete/:id", authmiddleware, deleteCatController);

module.exports = router;
