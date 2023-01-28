const { Subrereadit } = require("../db/models");

const checkIfSubrereaditExists = async (req, res, next) => {
	const { subId } = req.params;
	const subrereadit = await Subrereadit.scope({
		method: ["singleSub"]
	}).findByPk(+subId);

	if (!subrereadit) {
		const err = new Error("Subrereadit could not be found");
		err.status = 404;
		return next(err);
	}
	req.subrereadit = subrereadit;
	return next();
};

module.exports = {
	checkIfSubrereaditExists
};
