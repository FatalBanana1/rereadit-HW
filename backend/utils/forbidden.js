// Verify Mod Status
const verifyIsMod = (req, res, next) => {
	const userId = req.user.id;
	const isMod = req.subreadit.Mods.some(el => el.id === userId);
	if (!isMod) {
		return res.status(403).json({
			title: "Not Authorized",
			message: "User must be a mod to edit a subreadit",
			status: 403
		});
	}
	return next();
};

// Verify User is Admin of Subreadit
const verifyIsAdmin = (req, res, next) => {
	const userId = req.user.id;
	const isAdmin = req.subreadit.adminId === userId;

	if (!isAdmin) {
		return res.status(403).json({
			title: "Not Authorized",
			message: "User must be Admin to delete a subreadit",
			status: 403
		});
	}

	return next();
};

module.exports = {
	verifyIsMod,
	verifyIsAdmin
};
