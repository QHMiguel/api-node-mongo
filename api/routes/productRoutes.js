"use strict";

// create App function
module.exports = function (app) {
  var product = require("../controllers/productController");

  // product Routes

  // get and post request for /todos endpoints
  app.route("/products").get(product.listAllProducts).post(product.createNewProduct);

  // put and delete request for /todos endpoints
  app.route("/products/:id").put(product.updateProduct).delete(product.deleteProduct);
};
