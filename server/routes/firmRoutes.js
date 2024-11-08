const firmController = require("../controllers/firmController");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.post("/add-firm", verifyToken, firmController.addFirm);

router.get("/upload/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});
router.delete("/:firmId", firmController.deleteFirmById);
module.exports = router;
