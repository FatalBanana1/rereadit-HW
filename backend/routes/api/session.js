// routes > api > session

//imports
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// routes

/*
// Testing post error handler - username
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `WZ3UREHn-tA17z4URf2Fq6kNW7bmgUb9WW_c`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

//testing email
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `WZ3UREHn-tA17z4URf2Fq6kNW7bmgUb9WW_c`
  },
  body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

// testing invalid user credential + pass combo
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `WZ3UREHn-tA17z4URf2Fq6kNW7bmgUb9WW_c`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
}).then(res => res.json()).then(data => console.log(data));

*/

// log out - delete
router.delete("/", (_req, res) => {
	res.clearCookie("token");
	return res.json({ message: "success" });
});

/*
// testing delete = logout user
fetch('/api/session', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `kShVWw7C-r9HSPD4kiCeaJheXfmcNN8Qz4Kc`
  }
}).then(res => res.json()).then(data => console.log(data));
*/

// Restore session user
router.get("/", restoreUser, async (req, res) => {
	let { user } = req;
	if (!user) {
		return res.json({
			user: null,
		});
	}
	if (user.id) {
		user = await User.scope(["defaultScope"]).findOne({
			where: { id: user.id },
		});
		return res.json({
			user: user,
		});
	} else return res.json({ user: null });
});

// check keys + validate them
// checks req.body.credential + req.body.password = empty
// if empty >> error
const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Email is required"),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Password is required"),
	handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

	let user = await User.login({ credential, password });

	// check credentials
	let errors = {};
	if (!credential) {
		errors.email = `Email is required`;
	}
	if (!password) {
		errors.password = `Password is required`;
	}
	//checking email/pass
	if (Object.values(errors).length) {
		return res.status(400).json({
			message: "Validation error",
			statusCode: 400,
			errors: errors,
		});
	}

	if (!user) {
		return res.status(401).json({
			message: `Invalid Credentials`,
			statusCode: 401,
		});
	}

	user = await User.scope(["defaultScope"]).findOne({
		where: { id: user.id },
	});
	await setTokenCookie(res, user);

	// return res.json({
	// 	user: user,
	// });

	return res.json({
		user: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: credential,
			username: user.username,
		},
	});
});

/*
// testing post LOG IN

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `o0jz3lyU-eAvX71C6YpOT7TKQWxXAya2BBEQ`
  },
  body: JSON.stringify({ credential: 'rocks@yahoo.com', password: 'password3' })
}).then(res => res.json()).then(data => console.log(data));

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `O0XTQ251-By7aMtAqJzRvKl4zQISjP1SZFLw`
  },
  body: JSON.stringify({ credential: 'rocks@yahoo.com', password: 'password3' })
}).then(res => res.json()).then(data => console.log(data));

*/

// exports
module.exports = router;
