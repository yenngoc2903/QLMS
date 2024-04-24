const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const initWebRoutes = require("./route/web");

dotenv.config();

// CONNECT DATABASE
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect success");
  })
  .catch((err) => {
    console.error("Connect error:", err);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// //PUBLIC
// app.use(express.static('public'))
// // app.use('/images', express.static('/images'))
// app.use('/images', express.static(path.join(__dirname, '/images')))

//ROUTES
initWebRoutes(app);

app.listen(3500, () => {
  console.log("Server is running.......");
});
