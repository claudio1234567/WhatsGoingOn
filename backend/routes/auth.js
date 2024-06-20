const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrazione
router.post('/register', async (req, res) => {
  const { nome, cognome, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ nome, cognome, password: hashedPassword });
  try {
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { nome, cognome, password } = req.body;
  const user = await User.findOne({ nome, cognome });
  if (!user) return res.status(400).send('User not found');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;