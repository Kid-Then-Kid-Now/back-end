const express = require('express');

const router = express.Router();

const GalleryTitle = require('../models/galleryTitle');

// Get all titles
// http://localhost:5000/api/gallerytitles
router.get('/', (req, res, next) => {
	GalleryTitle.find()
		.then((titles) => res.json(titles))
		.catch(next);
});

//create a gallery title
router.post('/', (req, res, next) => {
	GalleryTitle.create(req.body)
		.then((galleryTitle) => {
			GalleryTitle.find({}).then((galleryTitle) => {
				res.json(galleryTitle);
			});
		})
		.catch(next);
});

// update a gallery title
router.put('/:id', (req, res, next) => {
	GalleryTitle.findOneAndUpdate({ _id: req.params.id }, req.body)
		.then((galleryTitle) =>
			GalleryTitle.find({}).then((galleryTitle) => {
				res.json(galleryTitle);
			})
		)
		.catch(next);
});

// delete a gallery title
router.delete('/:id', (req, res, next) => {
	GalleryTitle.findOneAndRemove({ _id: req.params.id }, req.body)
		.then((galleryTitle) =>
			GalleryTitle.find({}).then((galleryTitle) => {
				res.json(galleryTitle);
			})
		)
		.catch(next);
});

module.exports = router;
