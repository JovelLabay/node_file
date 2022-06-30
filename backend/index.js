const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const fileRoute = require("./src/routes/file.route");

const app = express();
const port = process.env.PORT || 8080;

require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(fileRoute);

mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => {
    app.listen(port, () => {
      console.log("The server is listening on port " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
