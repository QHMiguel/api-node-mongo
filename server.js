"use strict";

// require express and bodyParser
const express = require("express");
const bodyParser = require("body-parser");
// Import DB Connection
require("./config/db");
require('dotenv').config();

// create express app
const app = express();

// define port to run express app
const port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

// Add endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Import API route
var productRoute = require('./api/routes/productRoutes'); //importing route
productRoute(app);

/* Error handler middleware */

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Listen to server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
