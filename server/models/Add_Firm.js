const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
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
  region: {
    type: [
      {
        type: String,
        enum: ["south-Indian", "north-Indian", "chinese", "bakary"],
      },
    ],
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});
module.exports = mongoose.model("firms", firmSchema);
