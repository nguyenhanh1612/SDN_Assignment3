const Category = require('../models/category.model');
const Product = require('../models/product.model');

const showCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log("Danh sách danh mục:", categories);

    res.render('categories', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tải danh mục" });
  }
};

const showProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.render('products', { products }); //render UI
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tải sản phẩm" });
  }
};

// const showIndex = (req, res) => {
//   try {
//     res.render('index');
//   } catch (error) {
    
//   }
// }

const showDashboard = (req, res) => {
  res.render('dashboard');
};

module.exports = {
  showCategories,
  showProducts,
  showDashboard,
};
