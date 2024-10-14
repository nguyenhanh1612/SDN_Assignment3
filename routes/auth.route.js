const express = require("express");
const { register, login, deleteAccount, showFormLogin, showFormRegister } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", showFormLogin);
router.get("/register", showFormRegister);
router.delete("/delete", authenticateToken, deleteAccount); 

module.exports = router;
