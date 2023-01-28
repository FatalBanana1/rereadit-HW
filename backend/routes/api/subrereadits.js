// routes > api > subrereadits

//imports
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { checkIfSubrereaditExists } = require("../../utils/not-found");
const { User, Subrereadit, Subscription } = require("../../db/models");
const router = express.Router();

router.get("/:subId", checkIfSubrereaditExists, (req, res, next) => {
	res.json(req.subrereadit);
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
