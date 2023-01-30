const { Subreadit } = require("../db/models");

const checkIfSubreaditExists = async (req, res, next) => {
	const { subId } = req.params;
	const subreadit = await Subreadit.scope({
		method: ["singleSubreadit"]
	}).findByPk(+subId);

	if (!subreadit) {
		return res.status(404).json({
			title: "Not Found",
			message: "Subreadit could not be found",
			status: 404
		});
	}
	req.subreadit = subreadit;
	return next();
};

module.exports = {
	checkIfSubreaditExists
};
