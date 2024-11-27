const Product = require("../models/Product");
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

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    let firmId = req.params.firmid;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(400).json("restaurent is not found");
    }
    const newProduct = new Product({
      productName,
      price,
      category,
      image,
      bestSeller,
      description,
      firm: firm._id,
    });
    const saveProduct = await newProduct.save();
    firm.product.push(saveProduct);
    firm.save();
    return res.status(200).json({ success: "product added successfully" });
  } catch {
    return res.status(400).json({ message: "internal server error" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("firm");
    res.json({ products });
  } catch (e) {
    return res.status(400).json({ message: "internal server error" });
  }
};
const getProductByFirm = async (req, res) => {
  try {
    const firm = await Firm.findById(req.params.firmid);
    if (!firm) {
      return res.status(400).json({ message: "firm not found" });
    }
    const restaurentName = firm.firmName;
    const product = await Product.find({ firm: req.params.firmid });
    res.send({ restaurentName, product });
  } catch (e) {
    return res.status(400).json({ message: "internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const deletedproduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    if (!deletedproduct) {
      return res.status(400).json({ message: "product not found" });
    }
    return res.status(200).json({ success: "product deleted" });
  } catch (e) {
    return res.status(404).json({ message: "internal server error" });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  upload,
  getAllProducts,
  getProductByFirm,
  deleteProductById,
};
