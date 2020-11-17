const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const galleriesControllers = require('./controllers/galleries');
app.use('/api/galleries', galleriesControllers);

const galleryTitlesControllers = require('./controllers/galleryTitles');
app.use('/api/gallerytitles', galleryTitlesControllers);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`App is running ${port}`);
});
