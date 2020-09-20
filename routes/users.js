const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/auth');
const { postValidation } = require('../validation/post');
const verify = require('../middlewares/verifyTokenMiddleware');

router.post('/register', async (req, res) => {
	const { user_name, email, password } = req.body;

	//lets validate the data before we a user
	const { error } = await registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//checking if the email is already in the database
	const emailExist = await User.findOne({ email });
	if(emailExist) return res.status(400).send('Email already exists');

	//checking if the user is already in the database
	const userExist = await User.findOne({ user_name });
	if(userExist) return res.status(400).send('User name already exists');

	//create a new user
	const user = new User({ user_name, email, password });

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
	const user = await User.findOne({email});
	if (!user) return res.status(400).send('Email is not found');

	//checking if password is correct
	const validPass = await user.checkPassword(password);
	if (!validPass) return res.status(400).send('Invalid password');

	//Create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
});

router.get('/profile', verify, async (req, res) => {
	const userID = req.user._id;
    if(!userID) res.status(400).send('Invalid Token');

	try {
		//checking if the user is already in the database
		const user = await User.findOne({ _id: userID });
		user["password"] = "encrypted";
		if(!user) return res.status(400).send('Invalid Token');
		res.send({user});
	} catch (err) {
		res.status(400).send(err);
	}
});

//update an post
router.put('/:id', verify, async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(400).send('Invalid id');
    const {
    	first_name = user.first_name,
    	last_name = user.last_name,
    	imageURL = user.imageURL,
    	bio = user.bio,
    	website = user.website,
    	location = user.location,
    } = req.body.user;
    
    try {
        await User.updateOne(
            {_id: id},
            { $set: { first_name, last_name, imageURL, bio, website, location } 
        });
        res.send('User has been successfully updated');
    } catch {
        res.status(400).send("DB Updating Error");
    }
});

module.exports = router;