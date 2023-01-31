// routes > api > subreadits

//imports
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { checkIfSubreaditExists } = require("../../utils/not-found");
const { User, Subreadit, Subscription } = require("../../db/models");
const {
	validateCreateSubreadit,
	validateEditSubreadit
} = require("../../utils/validation-chains");
const { verifyIsMod, verifyIsAdmin } = require("../../utils/forbidden");
const router = express.Router();

// POST new Subreadit
router.post(
	"/",
	requireAuth,
	validateCreateSubreadit,
	async (req, res, next) => {
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
	}
);

// GET Subreadit by id
router.get("/:subId", checkIfSubreaditExists, (req, res, next) => {
	return res.json(req.subreadit);
});

// GET: Get All Subreadits Route: /api/subreadits
router.get("/", async (req, res, next) => {
	console.log(`BACKEND - get all`)
	const allSubreadits = await Subreadit.scope({
		method: ["allSubreadits"]
	}).findAll();

	return res.json(allSubreadits);
});

// PUT Edit Subreadit by id
router.put(
	"/:subId",
	requireAuth,
	checkIfSubreaditExists,
	verifyIsMod,
	validateEditSubreadit,
	async (req, res, next) => {
		req.subreadit.about = req.body.about;
		req.subreadit.category = req.body.category;
		req.subreadit.bannerImage = req.body.bannerImage;
		req.subreadit.circleImage = req.body.circleImage;

		const updatedSub = await req.subreadit.save();
		const { id, adminId, name, about, category, bannerImage, circleImage } =
			updatedSub;
		return res.json({
			id,
			adminId,
			name,
			about,
			category,
			bannerImage,
			circleImage
		});
	}
);

// DELETE Subreadit by id
router.delete(
	"/:subId",
	requireAuth,
	checkIfSubreaditExists,
	verifyIsAdmin,
	async (req, res, next) => {
		const subName = req.subreadit.name;
		await Subreadit.destroy({
			where: { id: req.subreadit.id }
		});

		return res.json({
			message: `Successfully deleted ${subName}`
		});
	}
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
