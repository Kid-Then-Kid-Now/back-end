const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const galleriesControllers = require('./controllers/galleries');
app.use('/api/galleries', galleriesControllers);

const userController = require('./controllers/users');
app.use('/api', userController);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`App is running ${port}!`);
});
