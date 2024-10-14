const Product = require("../models/product.model");
const Category = require("../models/category.model");

// Tạo mới một sản phẩm
const createProduct = async (req, res) => {
  try {
    // Kiểm tra xem category có tồn tại không
    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Error fetching products", error });
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      "category"
    );
    if (product) {
      
      res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error fetching product", error });
  }
};


const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error details:", error);
    res
      .status(400)
      .json({ message: "Error deleting product", error: error.message });
  }
};

// Xuất khẩu tất cả các hàm
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
