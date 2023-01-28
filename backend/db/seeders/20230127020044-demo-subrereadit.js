"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Subrereadits";
		return queryInterface.bulkInsert(
			options,
			[
				{
					organizerId: 1,
					name: "Python",
					about:
						"News about the programming language Python. If you have something to teach others post here."
				},
				{
					organizerId: 1,
					name: "JavaScript",
					about: "All about the JavaScript programming language!"
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Subrereadits";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				organizerId: {
					[Op.in]: [1, 2, 3, 4, 5]
				}
			},
			{}
		);
	}
};
