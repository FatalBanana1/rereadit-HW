"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Posts";
		return queryInterface.bulkInsert(
			options,
			[
				{
					userId: 1,
					subId: 1,
					title: "The first ever post in the Python subreadit",
					text: "I didn't like Python at first because I'm afraid of change",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
				},
				{
					userId: 1,
					subId: 1,
					title: "Second",
					text: "I love python",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
				},
				{
					userId: 1,
					subId: 1,
					title: "Third",
					text: "I don't even know what python is",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
				},
				{
					userId: 1,
					subId: 1,
					title: "fourth",
					text: "I'm just here so I don't get fined",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
				},
				{
					userId: 1,
					subId: 1,
					title: "fifth",
					text: "Another post",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
				},
				{
					userId: 1,
					subId: 1,
					title: "sixth",
					text: "This is a lot of typing.......",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Posts";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				subId: {
					[Op.gte]: 0
				}
			},
			{}
		);
	}
};
