const mongoose = require('../db/connection');

const Schema = mongoose.Schema;

const galleryTitleSchema = new Schema(
	{
		title: { type: String, required: true },
	},
	{ timestamps: true }
);

const Title = mongoose.model('Title', galleryTitleSchema);

module.exports = Title;
