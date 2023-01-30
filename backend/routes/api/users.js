// routes > api > users

//imports
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const {
	handleValidationErrors,
	validateSignup
} = require("../../utils/validation-chains");
const router = express.Router();

// routes

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
	const { firstName, lastName, email, username, password } = req.body;

	//check if exists
	let check = await User.findOne({
		where: {
			firstName,
			lastName,
			email,
			username
		}
	});
	if (check) {
		return res.status(403).json({
			message: "User already exists",
			statusCode: 403,
			errors: {
				email: "User with that email already exists"
			}
		});
	}

	//signup
	let user = await User.signup({
		firstName,
		lastName,
		email,
		username,
		password
	});

	await setTokenCookie(res, user);

	user = await User.scope(["defaultScope"]).findOne({
		attributes: ["id", "firstName", "lastName", "email"],
		where: { firstName, lastName, email, username }
	});

	return res.json({
		User: {
			id: user.id,
			firstName,
			lastName,
			email,
			username
		}
	});
});

/*
// testing singup error handling

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `OBpTO4SP-yXA7pc7gP6e5ClbDm7OEi22o7kY`
  },
  body: JSON.stringify({
    email: 'firestar@spider.man',
    username: 'Firestar',
    password: ''
  })
}).then(res => res.json()).then(data => console.log(data));
*/

// exports
module.exports = router;
