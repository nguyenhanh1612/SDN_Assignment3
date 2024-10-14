const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Account = require("../models/account.model");

// Đăng ký
const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newAccount = new Account({ username, password });
    await newAccount.save();
    return res.redirect("/api/auth/login");
  } catch (error) {
    console.error("Error creating account", error);
    res.status(500).json({ message: "Error creating account", error });
  }
};

// Đăng nhập
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("hello", req.body);
  console.log(password, username);
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const account = await Account.findOne({ username });
    console.log("Account đây: ", account);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: account._id }, "mysupersecretkey", {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true, // Cookie chỉ có thể truy cập bởi server
      secure: false, // Chỉ gửi qua HTTPS
      maxAge: 3600000, // 1 giờ
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

const showFormLogin = (req, res) => {
  res.render("login");
};

const showFormRegister = (req, res) => {
  res.render("register");
};

const deleteAccount = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const deletedAccount = await Account.findOneAndDelete({ username });
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account", error);
    res.status(500).json({ message: "Error deleting account", error });
  }
};

module.exports = {
  register,
  login,
  deleteAccount,
  showFormLogin,
  showFormRegister,
};
