// routes > api > subreadits

//imports
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { checkIfSubreaditExists } = require("../../utils/not-found");
const { User, Subreadit, Subscription } = require("../../db/models");
const router = express.Router();

router.get("/:subId", checkIfSubreaditExists, (req, res, next) => {
	res.json(req.subreadit);
});

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
