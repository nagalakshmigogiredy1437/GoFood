const Vendor = require("../models/Vendor");
const Firm = require("../models/Add_Firm");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    if (vendor.firm.length > 0) {
      return res.status(400).json({ message: "Vendor can have only one firm" });
    }
    const newFirm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm = await newFirm.save();
    const formId = savedFirm._id;
    vendor.firm.push(savedFirm);
    await vendor.save();
    return res.status(200).json({ message: "Firm added successfully", formId });
  } catch (err) {
    console.error("Error in addFirm:", err);
    return res.status(400).json({ message: "Error adding firm", error: err });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const deletedFirm = await Firm.findByIdAndDelete(req.params.firmId);
    if (deletedFirm) {
      return res.status(400).json({ message: "no firm founnd" });
    }
    return res.status(200).json({ success: "deleted the firm" });
  } catch (e) {
    return res.status(404).json({ message: "internal server error" });
  }
};

module.exports = { addFirm: [upload.single("image"), addFirm], deleteFirmById };
