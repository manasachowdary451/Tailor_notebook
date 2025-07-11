const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const isAuthenticated = require('../middlewares/auth');

const Customer = require('../models/customer');
const Order = require('../models/Order');
const Measurement = require('../models/Measurement');
const User = require('../models/Users');

// Dashboard Home
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('customer/dashboard', { user: req.session.user });
});

// GET: Add Measurements Form
// Show gender selection instead of direct form
router.get('/measurements', isAuthenticated, (req, res) => {
  res.render('customer/select-gender', { user: req.session.user });
});

// Routes for each gender
router.get('/measurements/male', isAuthenticated, (req, res) => {
  res.render('customer/measurements-male', { user: req.session.user });
});

router.get('/measurements/female', isAuthenticated, (req, res) => {
  res.render('customer/measurements-female', { user: req.session.user });
});

router.get('/measurements/kids', isAuthenticated, (req, res) => {
  res.render('customer/measurements-kids', { user: req.session.user });
});


// POST: Save Measurements
router.post('/measurements', isAuthenticated, async (req, res) => {
  const { chest, waist, hip, inseam } = req.body;
  try {
    await Measurement.create({
      userId: req.session.user.id,
      chest, waist, hip, inseam
    });
    res.redirect('/customer/dashboard');
  } catch (err) {
    res.send('Error saving measurements: ' + err.message);
  }
});

// GET: Order History
router.get('/orders', isAuthenticated, async (req, res) => {
  const orders = await Order.find({ customerId: req.session.user.id });
  res.render('customer/orders', { orders });
});

// GET: Profile - Personal Details
router.get('/profile', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.user.id);
  const customer = await Customer.findById(req.session.user.id);
  res.render('customer/profile', { user, customer });
});

// POST: Update Personal Details
router.post('/profile', isAuthenticated, async (req, res) => {
  const { email, phone, address } = req.body;

  try {
    await User.findByIdAndUpdate(req.session.user.id, {
      email,
      phone,
      address
    });
    res.redirect('/customer/profile');
  } catch (err) {
    res.send('Error updating profile: ' + err.message);
  }
});

// POST: Change Password
router.post('/change-password', isAuthenticated, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.session.user.id);
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.send('❌ Current password is incorrect.');
    }

    // Optional: validate newPassword strength here

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.send('✅ Password changed successfully.');
  } catch (err) {
    res.send('Error changing password: ' + err.message);
  }
});

module.exports = router;
