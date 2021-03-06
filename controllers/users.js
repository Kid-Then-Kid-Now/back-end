const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const { createUserToken } = require('../middleware/auth');

// routes/controllers here

// SIGN UP
// POST /api/signup
router.post('/signup', async (req, res, next) => {
	// wrap it in a try
	try {
		// store the results of any asynchronous calls in variables
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({ email: req.body.email, password });
		res.status(201).json(user);
	} catch (error) {
		// return the next callback and pass it the error from catch
		return next(error);
	}
});

// SIGN IN
router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		// Pass the user and the request to createUserToken
		.then((user) => createUserToken(req, user))
		// createUserToken will either throw an error that
		// will be caught by our error handler or send back
		// a token that we'll in turn send to the client.
		.then((token) => {
			User.findOne({ email: req.body.email }).then((user) =>
				res.json({ token, user })
			);
		})
		.catch(next);
});

module.exports = router;
