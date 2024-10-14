const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.token; 
  
  console.log("Token received:", req.cookies);
  
  if (!token) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, "mysupersecretkey", (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }
    req.user = user;
    next(); 
  });
}

module.exports = { authenticateToken };
