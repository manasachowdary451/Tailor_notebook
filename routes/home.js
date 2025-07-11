const express = require('express');
const router = express.Router();

// Landing Page
router.get('/', (req, res) => {
  res.render('home'); // This will render views/home.ejs
});

// Optional redirects to prefill role
router.get('/login/tailor', (req, res) => {
  res.redirect('/auth/login?role=tailor');
});

router.get('/login/customer', (req, res) => {
  res.redirect('/auth/login?role=customer');
});
router.get('/signup/tailor', (req, res) => res.redirect('/auth/signup?role=tailor'));
router.get('/signup/customer', (req, res) => res.redirect('/auth/signup?role=customer'));

module.exports = router;
