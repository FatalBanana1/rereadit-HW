// routes >> api >> index

// imports
const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
const eventsRouter = require("./events.js");
const venuesRouter = require("./venues.js");
const groupImagesRouter = require("./group-images.js");
const eventImagesRouter = require("./event-images.js");

// routes

//test api router
// router.post("/test", function (req, res) {
// 	res.json({ requestBody: req.body });
// });

// test in brower console:
/*
fetch('/api/test', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `lQkwdIIS-eM2K0y2PEMZJvutk44Sx4rz2cBc`
  },
  body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));
*/

// // testing user auth middleware - utils > auth.js
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");
// router.get("/set-token-cookie", async (_req, res) => {
// 	const user = await User.findOne({
// 		where: {
// 			username: "Demo-lition",
// 		},
// 	});
// 	setTokenCookie(res, user);
// 	return res.json({ user: user });
// });

// // test user auth middle - utils > auth.js
// // GET /api/require-auth
router.use(restoreUser);
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
	return res.json(req.user);
});

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/groups", groupsRouter);
router.use("/events", eventsRouter);
router.use("/venues", venuesRouter);
router.use("/group-images", groupImagesRouter);
router.use("/event-images", eventImagesRouter);

router.post("/test", (req, res) => {
	res.json({ requestBody: req.body });
});

// exports
module.exports = router;
