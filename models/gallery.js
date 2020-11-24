const mongoose = require('../db/connection');

const Schema = mongoose.Schema;

const GallerySchema = new Schema(
	{
		title: { type: String, required: true },
		imgUrl: { type: String, required: true },
		caption: String,
		eraTime: String,
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;
