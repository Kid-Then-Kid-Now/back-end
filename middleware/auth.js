const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a secret to be used to encrypt/decrypt the token
const secret =
	process.env.JWT_SECRET || 'secretlover';

// Require the specific `strategy` 
// Require the method that will handle extracting the token
// from each of the requests sent by clients
const { Strategy, ExtractJwt } = require('passport-jwt');

// Minimum required options for passport-jwt
const opts = {
	// passport should find and extract the token from
    // the request.   send it as a `bearer` token
    
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// Any secret string to use that is unique to your app
	secretOrKey: secret,
};


const User = require('../models/User');


// call new and pass in the options we set in the `opts` variable.
// pass it a callback function that passport will use when we call
// this as middleware.  
//The callback will be passed the data that was extracted and decrypted by passport   
const strategy = new Strategy(opts, function (jwt_payload, done) {
	// In the callback we run our custom code. With the data extracted from
	// the token that we're passed as jwt_payload we'll have the user's id.
	// Using Mongoose's `.findOneById()` method, we find the user in our database
	User.findById(jwt_payload.id)
	
		.then((user) => done(null, user))
		// If there was an error, we pass it to done 
		.catch((err) => done(err));
});


passport.use(strategy);

// Initialize the passport middleware 
passport.initialize();

// Create a variable that holds the authenticate method so we can
// export it for use in our routes
const requireToken = passport.authenticate('jwt', { session: false });

// create a token to send back to the user
const createUserToken = (req, user) => {
	// Make sure that we have a user
    // find the email in the database.  
    //If there is a user, make sure that the password is correct.    
	if (
		!user ||
		!req.body.password ||
		!bcrypt.compareSync(req.body.password, user.password)
	) {
		const err = new Error('The provided username or password is incorrect');
		err.statusCode = 422;
		throw err;
	}
	// If no error was thrown, we create the token from user's id and
	// return the token
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

module.exports = {
	requireToken,
	createUserToken,
};
