const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "firms",
    },
  ],
});
module.exports = mongoose.model("vendors", VendorSchema);
