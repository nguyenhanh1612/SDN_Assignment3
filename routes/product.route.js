const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const validateProductData = (req, res, next) => {
  const { name, price, description, category } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: "Product name is required and should be a non-empty string." });
  }
  if (!price || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: "Product price is required and should be a positive number." });
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: "Product description is required and should be a non-empty string." });
  }
  if (category && typeof category !== 'string') {
    return res.status(400).json({ error: "Product category should be a string." });
  }
  next();
};


router.post("/", authenticateToken, validateProductData, createProduct); 

router.get("/", authenticateToken, getAllProducts);


router.get("/:productId", authenticateToken, getProductById);


router.put("/:productId", authenticateToken, validateProductData, updateProduct); 


router.delete("/:productId", authenticateToken, deleteProduct);

module.exports = router;
