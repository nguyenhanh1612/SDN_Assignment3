const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { authenticateToken } = require("../middlewares/auth.middleware")

router.post("/", authenticateToken, createCategory);


router.get("/", authenticateToken, getAllCategories);


router.get("/:id", authenticateToken, getCategoryById);


router.put("/:id", authenticateToken, updateCategory);


router.delete("/:id", authenticateToken, deleteCategory);

module.exports = router;
