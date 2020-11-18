const Gallery = require('../models/gallery');
const GallerySeeds = require('./galleries.json');

Gallery.deleteMany({}).then(() => {
	Gallery.insertMany(GallerySeeds).then(() => {
		process.exit();
	});
});
