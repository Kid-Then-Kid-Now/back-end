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

module.exports = router;
