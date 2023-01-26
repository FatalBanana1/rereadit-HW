// routes >> index.js

//create express router
const express = require("express");
const router = express.Router();

//connect api dir with routes
const apiRouter = require("./api");
router.use("/api", apiRouter);

//test route
// router.get("/hello/world", function (req, res) {
// 	res.cookie("XSRF-TOKEN", req.csrfToken());
// 	res.send("Hello World!");
// });

// get /api/csrf/restore
// allows dev to reset csrf token cookie xsrf-token
// set cookie on response
router.get("/api/csrf/restore", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("XSRF-TOKEN", csrfToken);
	res.status(200).json({
		"XSRF-TOKEN": csrfToken,
	});
});

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
	const path = require("path");
	// Serve the frontend's index.html file at the root route
	router.get("/", (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		res.sendFile(
			path.resolve(__dirname, "../../frontend", "build", "index.html")
		);
	});

	// Serve the static assets in the frontend's build folder
	router.use(express.static(path.resolve("../frontend/build")));

	// Serve the frontend's index.html file at all other routes NOT starting with /api
	router.get(/^(?!\/?api).*/, (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		res.sendFile(
			path.resolve(__dirname, "../../frontend", "build", "index.html")
		);
	});
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
	router.get("/api/csrf/restore", (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		res.status(201).json({});
	});
}

module.exports = router;
