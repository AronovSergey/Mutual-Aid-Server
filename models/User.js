const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
	email: { type: String, reuqire: true, unique: true },
	user_name: { type: String, require: true, unique:true },
	password: { type: String, reuqire: true, min: 8 },
	first_name: { type: String},
	last_name: { type: String},
	createdAt: { type: Date, default: Date.now},
	imageURL: { type: String, required: true, default:'https://mutual-aid.me/images/1600361595010no-img.png'},
	location: { type: String}
});

// Before each save - do:
userSchema.pre('save', function(next){
	// Object "user" -> this
	const user = this;

	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, saltRounds, (err, hash) => {
		if (err) return next(err);

		user.password = hash;
		next();
	});
});

//Each user can ".checkPassword()"
userSchema.methods.checkPassword = function(guess){
	const user = this
	return new Promise((resolve, reject) => {
		bcrypt.compare(guess, user.password, (err, res) => {
			if(err) reject(err)
			resolve(res);
		});
	});
}

module.exports = new mongoose.model('User', userSchema);