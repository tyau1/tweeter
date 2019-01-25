"use strict";

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

const DataHelpersMongo = require("./lib/data-helpers.js");
const tweetsRoutesMongo = require("./routes/tweets");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const dataHelpers = DataHelpersMongo(db);
  const tweetsRoutes = tweetsRoutesMongo(dataHelpers);
  app.use("/tweets", tweetsRoutes);

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);

});

