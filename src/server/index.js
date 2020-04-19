var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const port = 8081;

const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
const aylien = require("aylien_textapi");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.static("dist"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/test", function(req, res) {
  res.send(mockAPIResponse);
});

app.post("/sentiment-analysis", (req, res) => {
  console.log(req.body);
  textapi.sentiment({ url: req.body.url }, (error, result) => {
    if (error) {
      console.log("error", error);
      res.send();
      return;
    }
    res.send(result);
  });
});

module.exports = app;
