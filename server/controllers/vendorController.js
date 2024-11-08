const vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/Vendor");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.SECRET_KEY;

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let vendorEmail = await vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json({ message: "email already exist" });
    }
    let hashpass = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      username,
      email,
      password: hashpass,
    });
    await newVendor.save();
    console.log("registered");
    return res.status(200).json({ success: "registartion successfull" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "error in vendor registration " });
  }
};

const vendorLogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    const venEmail = await vendor.findOne({ email });
    if (!venEmail || !(await bcrypt.compare(password, venEmail.password))) {
      return req
        .status(404)
        .json({ message: "password or email incorrect plase check!" });
    }
    const token = jwt.sign({ vendorId: venEmail._id }, secretKey, {
      expiresIn: "1h",
    });
    console.log(venEmail, token);
    res.status(200).json({ success: "Login successfully", token });
  } catch (err) {
    return req.status(404).json({ message: "error in vendor login " });
  }
};
const getAllVendors = async (req, res) => {
  try {
    const vendors = await vendor.find().populate("firm");
    res.json({ vendors });
  } catch (err) {
    res.status(400).json({ message: "Internal server error", err });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendorbyid = await vendor.findById(req.params.id).populate("firm");
    if (!vendorbyid) {
      return res.status(400).json({ message: "vendor not found" });
    }
    return res.json({ vendorbyid });
  } catch {
    return res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
