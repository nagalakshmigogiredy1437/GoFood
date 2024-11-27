const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRouter = require("./routes/vendorRoutes");
const firmRouter = require("./routes/firmRoutes");
const productRouter = require("./routes/productRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
dotEnv.config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("error in mongo connection"));

app.use(bodyParser.json());
app.use("/vendor", vendorRouter);
app.use("/firm", firmRouter);
app.use("/product", productRouter);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("server listening on port 5000");
});

app.use("/", (req, res) => {
  res.send("<h1>welcom to GoFood</h1>");
});
