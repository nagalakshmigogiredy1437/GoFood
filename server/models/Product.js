const mongoose = require("mongoose");
const { schema } = require("./Vendor");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "firms",
    },
  ],
});

module.exports = mongoose.model("product", productSchema);
