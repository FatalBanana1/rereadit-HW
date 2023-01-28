const { Subreadit } = require("../db/models");

const checkIfSubreaditExists = async (req, res, next) => {
	const { subId } = req.params;
	const subreadit = await Subreadit.scope({
		method: ["singleSub"]
	}).findByPk(+subId);

	if (!subreadit) {
		const err = new Error("Subreadit could not be found");
		err.status = 404;
		return next(err);
	}
	req.subreadit = subreadit;
	return next();
};

module.exports = {
	checkIfSubreaditExists
};
