const Category = require("../models/category.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// Tạo mới một category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error details:", error);
    res
      .status(400)
      .json({ message: "Error creating category", error: error.message });
  }
};

// Lấy tất cả categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Lấy category theo ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: "Error fetching category", error });
  }
};

// Cập nhật category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error updating category", error });
  }
};

// Xóa category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // Tìm và xóa tất cả sản phẩm liên quan đến category này
    const deletedProduct = await Product.deleteMany({
      category: new mongoose.Types.ObjectId(id),
    });

    // Xóa category
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category and related products deleted successfully",
      deletedProduct: deletedProduct.deletedCount, // Số lượng sản phẩm đã xóa
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(400).json({ message: "Error deleting category", error });
  }
};

// Xuất các hàm đã định nghĩa
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
