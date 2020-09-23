const Joi = require('@hapi/joi');

const postValidation = data => {
	const schema = Joi.object({
			author: Joi.string().required(),
			title: Joi.string().min(5).max(50).required(),
			content: Joi.string().min(10).max(1000).required(),
			imageURL: Joi.string().required(),
			tags: Joi.required(),
		});
	return schema.validate(data);
};

module.exports.postValidation = postValidation;