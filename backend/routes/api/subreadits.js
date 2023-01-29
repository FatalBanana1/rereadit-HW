// routes > api > subreadits

//imports
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { checkIfSubreaditExists } = require("../../utils/not-found");
const { User, Subreadit, Subscription } = require("../../db/models");
const { validateSubreadit } = require("../../utils/validation-chains");
const router = express.Router();

// POST new Subreadit
router.post("/", requireAuth, validateSubreadit, async (req, res, next) => {
	const adminId = req.user.id;
	const { name, about, category, circleImage, bannerImage } = req.body;

	const newSubreadit = await Subreadit.create({
		adminId,
		name,
		about,
		category,
		circleImage,
		bannerImage
	});
	const subId = newSubreadit.id;
	await Subscription.create({ subId, userId: adminId, status: "Mod" });

	return res.json(newSubreadit);
});

// GET Subreadit by id
router.get("/:subId", checkIfSubreaditExists, (req, res, next) => {
	return res.json(req.subreadit);
});

// GET All Subreadits
router.get("/", async (req, res, next) => {
	const allSubreadits = await Subreadit.scope({
		method: ["allSubreadits"]
	}).findAll();

	return res.json(allSubreadits);
});

// PUT subreddit
router.put(
	"/:subId",
	requireAuth,
	checkIfSubreaditExists,
	async (req, res, next) => {}
);

module.exports = router;

/*

	{
		id: 1,
		name: "Python",
        about: "About info",
        SubscriberCount: 5,
		Organizer: {
            id: 1
            username: Demo-lition
        },
	}

*/
