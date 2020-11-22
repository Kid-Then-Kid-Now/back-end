const express = require('express');

const router = express.Router();

const Galleries = require('../models/gallery');

const {
	handleValidateId,
	handleRecordExists,
} = require('../middleware/custom_errors');

// Get all galleries
// http://localhost:5000/api/galleries
router.get('/', (req, res, next) => {
	Galleries.find()
		.then((galleries) => res.json(galleries))
		.catch(next);
});

// Get a Gallery by ID
router.get('/:id', handleValidateId, (req, res, next) => {
	const id = req.params.id;
	Galleries.findById(id)
		.then(handleRecordExists)
		.then((gallery) => res.json(gallery))
		.catch(next);
});

//created a gallery
router.post('/', (req, res, next) => {
	Galleries.create(req.body)
		.then((gallery) => {
			res.status(201).json(gallery);
		})

		.catch(next);
});

// update a gallery
router.put('/:id', handleValidateId, (req, res, next) => {
	Galleries.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then(handleRecordExists)
		.then((gallery) => {
			res.status(201).json(gallery);
		})
		.catch(next);
});

// delete a gallery
router.delete('/:id', handleValidateId, (req, res, next) => {
	Galleries.findOneAndRemove({ _id: req.params.id }, req.body)
		.then(handleRecordExists)
		.then((galleries) =>
			Galleries.find({}).then((galleries) => {
				res.json(galleries);
			})
		)
		.catch(next);
});

module.exports = router;
