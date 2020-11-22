const express = require('express');
const cors = require('cors');
const app = express();
const {
	handleErrors,
	handleValidationErrors,
} = require('./middleware/custom_errors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const galleriesControllers = require('./controllers/galleries');
app.use('/api/galleries', galleriesControllers);

const userController = require('./controllers/users');
app.use('/api/users', userController);

// The last middleware receives any error as its first argument
app.use((err, req, res, next) => {
	// If the error contains a statusCode, set the variable to that code
	// if not, set it to a default 500 code
	const statusCode = err.statusCode || 500;
	// If the error contains a message, set the variable to that message
	// if not, set it to a generic 'Internal Server Error'
	const message = err.message || 'Internal Server Error';
	// Set the status and send the message as a response to the client
	res.status(statusCode).send(message);
});

const port = process.env.PORT || 5000;

app.use(handleValidationErrors);
app.use(handleErrors);

app.listen(port, () => {
	console.log(`App is running ${port}!`);
});
