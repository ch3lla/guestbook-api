const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token)
      return res
        .status(403)
        .send("Access Denied: A token is required for authentication");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send("Invalid token");
  }
}
module.exports = authenticateUser;
