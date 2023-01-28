const { handleValidationErrors } = require("./validation");
const { check } = require("express-validator");

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username").not().isEmail().withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors
];

const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Email is required"),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Password is required"),
	handleValidationErrors
];
module.exports = {
	validateSignup,
	validateLogin
};
