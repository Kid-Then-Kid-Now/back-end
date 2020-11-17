const GalleryTitle = require('../models/galleryTitle');
const Gallery = require('../models/gallery');
const TitleSeeds = require('./titles.json');
const GallerySeeds = require('./galleries.json');

Gallery.deleteMany({}).then(() => {
	Gallery.insertMany(GallerySeeds).then(() => {
		GalleryTitle.deleteMany({}).then(() => {
			GalleryTitle.insertMany(TitleSeeds).then(() => process.exit());
		});
	});
});
