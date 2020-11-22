const express = require('express');

const router = express.Router();

const Galleries = require('../models/gallery');

const {
	handleValidateId,
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');

const { requireToken } = require('../middleware/auth');

// Get all galleries
// http://localhost:5000/api/galleries
router.get('/', (req, res, next) => {
	Galleries.find()
		.populate('owner', 'email -_id')
		.then((galleries) => res.json(galleries))
		.catch(next);
});

// Get a Gallery by ID
router.get('/:id', handleValidateId, (req, res, next) => {
	const id = req.params.id;
	Galleries.findById(id)
		.populate('owner')
		.then(handleRecordExists)
		.then((gallery) => res.json(gallery))
		.catch(next);
});

//created a gallery
router.post('/', requireToken, (req, res, next) => {
	Galleries.create(req.body)
		.then((gallery) => {
			res.status(201).json(gallery);
		})

		.catch(next);
});

// update a gallery
// router.put('/:id', handleValidateId, requireToken, (req, res, next) => {
// 	Galleries.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
// 		.populate('owner', 'email -_id')
// 		.then(handleRecordExists)
// 		.then((gallery) => {
// 			res.status(201).json(gallery);
// 		})
// 		.catch(next);
// });

router.put('/:id', handleValidateId, requireToken, (req, res, next) => {
	Galleries.findById(req.params.id)
		.then(handleRecordExists)
		.then((gallery) => handleValidateOwnership(req, gallery))
		.then((gallery) => gallery.set(req.body).save())
		.then((gallery) => {
			res.json(gallery);
		})
		.catch(next);
});

// delete a gallery
// router.delete('/:id', handleValidateId, (req, res, next) => {
// 	Galleries.findOneAndRemove({ _id: req.params.id }, req.body)
// 		.then(handleRecordExists)
// 		.then((galleries) =>
// 			Galleries.find({}).then((galleries) => {
// 				res.json(galleries);
// 			})
// 		)
// 		.catch(next);
// });

router.delete('/:id', handleValidateId, requireToken, (req, res, next) => {
	Galleries.findById(req.params.id)
		.then(handleRecordExists)
		.then((gallery) => handleValidateOwnership(req, gallery))
		.then((gallery) => gallery.remove())
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
});

module.exports = router;
