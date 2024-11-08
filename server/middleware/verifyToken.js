const vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();
const secretKey = process.env.SECRET_KEY;
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(404).json({ message: "token is required" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const vendorId = await vendor.findById(decoded.vendorId);
    if (!vendorId) {
      return res.status(400).json({ message: "vendor not found" });
    }
    req.vendorId = vendorId._id;
    console.log(vendorId._id);
    console.log(req.vendorId);
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
