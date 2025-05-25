const express = require('express');
const router = express.Router();

// This is a mock. In a real app, you'd store cart info in DB or session.
let cart = [];

router.get('/', (req, res) => {
  res.json(cart);
});

router.post('/', (req, res) => {
  cart.push(req.body);
  res.status(201).json(cart);
});

router.delete('/', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;