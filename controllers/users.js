const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// routes/controllers here

// SIGN UP
// POST /api/signup
router.post('/signup', async (req, res, next) => {
    // wrap it in a try
  try {
    // store the results of any asynchronous calls in variables
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ email: req.body.email, password })
    res.status(201).json(user) 
  } catch (error) {
		// return the next callback and pass it the error from catch
		return next(error);
	}
});

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
    User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
});




module.exports = router;
