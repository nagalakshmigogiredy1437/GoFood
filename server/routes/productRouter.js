const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/add-product/:firmid", productController.addProduct);
router.get("/:firmid/product", productController.getProductByFirm);
router.get("/all-products", productController.getAllProducts);

router.get("/upload/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/:productId", productController.deleteProductById);

module.exports = router;
