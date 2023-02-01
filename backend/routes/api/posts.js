// routes > api > subreadits

//imports
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { checkIfSubreaditExists } = require("../../utils/not-found");
const { User, Subreadit, Subscription, Post } = require("../../db/models");
const {
	validateCreateSubreadit,
	validateEditSubreadit,
} = require("../../utils/validation-chains");
const { verifyIsMod, verifyIsAdmin } = require("../../utils/forbidden");
const router = express.Router();

// GET post by postId
router.get("/:postId", async (req, res, next) => {
	let { postId } = req.params;
	const allPosts = await Post.scope({ method: ["allPosts"] }).findOne({
		where: { id: postId },
	});
	return res.json(allPosts);
});

// GET all posts
router.get("/", async (req, res, next) => {
	const allPosts = await Post.scope({ method: ["allPosts"] }).findAll();
	return res.json(allPosts);
});

module.exports = router;
