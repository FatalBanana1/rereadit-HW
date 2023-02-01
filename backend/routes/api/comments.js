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

module.exports = router;
