const Joi = require("joi");

// Joi schema
const registerSchema = Joi.object({
    firstname: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(30)
        .required()
        .messages({
            "string.pattern.base": "Firstname must contain only letters",
            "string.empty": "Firstname is required",
        }),
    lastname: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(2)
        .max(30)
        .required()
        .messages({
            "string.pattern.base": "Lastname must contain only letters",
            "string.empty": "Lastname is required",
        }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "Email must be valid",
        "string.empty": "Email is required",
    }),
    password: Joi.string()
        .min(7)
        .required()
        .messages({
            "string.min": "Password must be at least 7 characters long",
            "string.empty": "Password is required",
        }),
});

// Middleware function
const registerValidation = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res
            .status(400)
            .json({ errors: error.details.map((d) => d.message) });
    }
    next();
};

module.exports = { registerValidation };
