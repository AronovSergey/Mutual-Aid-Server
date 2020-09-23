const Joi = require('@hapi/joi');

const commentValidation = data => {
	const schema = Joi.object({
			userHandle: Joi.string().required(),
			postID: Joi.string().required(),
			body: Joi.string().required(),
			userImage: Joi.string().required(),
		});
	return schema.validate(data);
};

module.exports.commentValidation = commentValidation;