const mongoose = require('../db/connection')
const galleryTitleSchema = require('./galleryTitle')

const Schema = mongoose.Schema

const GallerySchema = new Schema({
    // galleryTitle: [galleryTitleSchema],
	title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    caption: String,
    eraTime: String,
    
}, { timestamps: true });

const Gallery = mongoose.model("Gallery", GallerySchema)

module.exports = Gallery 