const express = require('express');
const User = require('../models/User');

const router = express.Router();

// routes/controllers here

// SIGN UP
// POST /api/signup
router.post('/signup', (req, res, next) => {});

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
    User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
});




module.exports = router;
