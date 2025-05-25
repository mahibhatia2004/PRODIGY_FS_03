const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Create product
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = new Product({
    name, description, price, category, stock,
    image: req.file.path
  });
  await product.save();
  res.status(201).json(product);
});

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;