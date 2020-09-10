//VALIDATION 
const Joi = require('@hapi/joi');

const registerValidation = data => {
	const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(8).required(),
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
		});
	return schema.validate(data);
};

const loginValidation = data => {
	const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(8).required(),
		});
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;