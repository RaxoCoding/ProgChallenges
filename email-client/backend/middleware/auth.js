const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");

  try {
    const [headerB64] = token.split(".");
    const decodedHeader = JSON.parse(
      Buffer.from(headerB64, "base64url").toString("utf8")
    );

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "", {
      algorithms: [decodedHeader.alg],
    });

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).send("Invalid token");
  }
};
