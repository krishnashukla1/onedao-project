const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const register = async (req, res) => {
  const { email, password, country } = req.body;
  const invalidCountries = ['Syria', 'Afghanistan', 'Iran'];
  
  if (invalidCountries.includes(country)) {
    return res.status(400).json({ message: 'Sign up from this country is not allowed.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ email, password: hashedPassword, country });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    res.status(500).json({ message: 'Error in registration.', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.status(200).json({ message: 'Login successful', token });
};

const otpStore = {}; // in-memory store. In production, I will use Redis or DB.

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes validity

  console.log(`OTP for ${email}: ${otp}`); // In real-world, send via email

  res.status(200).json({ message: 'OTP sent to email' });
};
const verifyOtp = async (req, res) => {   
    const { email, otp } = req.body;
  
    const storedOtp = otpStore[email];
  
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not sent or expired' });
    }
  
    if (storedOtp.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  
    if (Date.now() > storedOtp.expiresAt) {
      return res.status(400).json({ message: 'OTP expired' });
    }
  
    delete otpStore[email]; // Clear after successful verification
  
    res.status(200).json({ message: 'OTP verified successfully' });
  };
  
module.exports = { register, login,sendOtp, verifyOtp };
