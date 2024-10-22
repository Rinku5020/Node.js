const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({ status: 'success', token, data: newUser });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Provide email and password!' });
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
  }
  const token = signToken(user._id);
  res.cookie('jwt', token, { httpOnly: true });
  res.status(200).json({ status: 'success', token });
};
