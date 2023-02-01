// routes > api > subreadits

//imports
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { checkIfSubreaditExists } = require("../../utils/not-found");
const {
	User,
	Subreadit,
	Subscription,
	Post,
	Comment,
} = require("../../db/models");
const {
	validateCreateSubreadit,
	validateEditSubreadit,
} = require("../../utils/validation-chains");
const { verifyIsMod, verifyIsAdmin } = require("../../utils/forbidden");
const router = express.Router();

// GET all comments
router.get("/", async (req, res, next) => {
	console.log(`COMMMENTS BACKEND -----`);
	const allComments = await Comment.scope({
		method: ["allComments"],
	}).findAll();
	return res.json(allComments);
});

module.exports = router;
