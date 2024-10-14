const express = require("express");
const router = express.Router();
const { showCategories, showProducts, showDashboard} = require("../controllers/admin.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");


router.get("/categories", authenticateToken, showCategories); 

router.get("/products", authenticateToken, showProducts); 

router.get("/", showDashboard);

module.exports = router;

