const jwt = require("jsonwebtoken");
const config = require("../config/config");

async function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  try {
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided" });
    }
    const decoded = await jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (e) {
    return res
      .status(401)
      .send({ auth: false, message: "Wrong token provided" });
  }
}

module.exports = verifyToken;
