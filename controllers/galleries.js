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

//created a gallery
router.post('/', (req, res, next) => {
	Galleries.create(req.body)
		.then((gallery) => {
			Galleries.find({}).then((galleries) => {
				res.json(galleries);
			});
		})
		.catch(next);
});

// update a gallery
router.put('/:id', (req, res, next) => {
	Galleries.findOneAndUpdate({ _id: req.params.id }, req.body)
		.then((galleries) =>
			Galleries.find({}).then((galleries) => {
				res.json(galleries);
			})
		)
		.catch(next);
});

// delete a gallery
router.delete('/:id', (req, res, next) => {
	Galleries.findOneAndRemove({ _id: req.params.id }, req.body)
		.then((galleries) =>
			Galleries.find({}).then((galleries) => {
				res.json(galleries);
			})
		)
		.catch(next);
});

module.exports = router;
