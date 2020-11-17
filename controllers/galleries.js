const express = require('express');

const router = express.Router();

const Galleries = require('../models/gallery');

// Get all galleries
// http://localhost:5000/api/galleries
router.get('/', (req, res, next) => {
	Galleries.find()
		.then((galleries) => res.json(galleries))
		.catch(next);
});

router.post('/', (req, res, next) => {
	Galleries.create(req.body)
		.then((gallery) => {
			Galleries.find({}).then((galleries) => {
				res.json(galleries);
			});
		})
		.catch(next);
});

module.exports = router;
