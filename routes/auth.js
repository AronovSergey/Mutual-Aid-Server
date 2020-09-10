const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/auth');

router.post('/register', async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	//lets validate the data before we a user
	const { error } = await registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the user is already in the database
	const emailExist = await User.findOne({ email });
	if(emailExist) return res.status(400).send('Email already exists');

	//create a new user
	const user = new User({ email, password, first_name, last_name });

	try {
		const savedUser = await user.save();
		res.send({user: savedUser._id});
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	//lets validate the data before we a user
	const { error } = await loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the email exists
	const user = await User.findOne({ email });
	if (!user) return res.status(400).send('Email is not found');

	//checking if password is correct
	const validPass = await user.checkPassword(password);
	if (!validPass) return res.status(400).send('Invalid password');

	//Create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);

});

module.exports = router;