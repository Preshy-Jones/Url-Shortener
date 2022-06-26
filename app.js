const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ejs = require("ejs");
const connectDB = require("./config/db");
const cors = require("cors");

const path = require("path");



//connectDB();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

bodyParser.urlencoded({ extended: true });
//app.use(express.json({ extended: false }));
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 4000;

dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to mongodb")
);

app.get("/ping", function (req, res) {
  return res.send("pong");
});
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
