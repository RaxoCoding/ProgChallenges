const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { HTTPUnauthorizedError, HTTPForbiddenError } = require("../utils/httpErrors");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new HTTPUnauthorizedError("No token provided");

  if (!process.env.JWT_SECRET) {
    throw new HTTPForbiddenError("JWT_SECRET not set");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  } catch {
    throw new HTTPForbiddenError("Invalid or tampered token");
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new HTTPUnauthorizedError("User not found or revoked");

  if (user.tokenVersion !== decoded.tokenVersion) {
    throw new HTTPUnauthorizedError("Token no longer valid");
  }

  req.user = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  };

  next();
};
