"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Comments";
		return queryInterface.bulkInsert(
			options,
			[
				{
					postId: 1,
					userId: 2,
					parentId: null,
					text: "I don't even know why I'm commenting."
				},
				{
					postId: 1,
					userId: 3,
					parentId: 1,
					text: "I don't know why you are either"
				},
				{
					postId: 1,
					userId: 1,
					parentId: null,
					text: "I started this subreadit"
				},
				{
					postId: 1,
					userId: 2,
					parentId: 3,
					text: "Nobody cares."
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Comments";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				postId: {
					[Op.gte]: 0
				}
			},
			{}
		);
	}
};
