// import Product Model
const Product = require("../models/productModel");

// DEFINE CONTROLLER FUNCTIONS

// listAllProducts function - To list all Products
exports.listAllProducts = (req, res) => {
  Product.find({}, (err, Product) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(Product);
  });
};

// createNewProduct function - To create new Product
exports.createNewProduct = (req, res) => {
  let newProduct = new Product(req.body);
  newProduct.save((err, Product) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(Product);
  });
};

// updateProduct function - To update Product status by id
exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, Product) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(Product);
    }
  );
};

// deleteProduct function - To delete Product by id
exports.deleteProduct = async (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "Product successfully deleted" }); 
  });
};
