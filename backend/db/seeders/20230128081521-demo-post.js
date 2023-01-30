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
					text: "Tell sub/python what you're working on this week! You can be bragging, grousing, sharing your passion, or explaining your pain. Talk about your current project or your pet project; whatever you want to share.",
					linkUrl: "",
					title: "Sunday Daily Thread: What's everyone working on this week?",
				},
				{
					userId: 4,
					subId: 1,
					text: "News",
					linkUrl:
						"https://www.sqlalchemy.org/blog/2023/01/26/sqlalchemy-2.0.0-released/",
					title: "SQLAlchemy 2.0.0 Released",
				},
				{
					userId: 6,
					subId: 2,
					text: "Will ChatGPT make us obsolete ? Why so many C#/Java programmer think their webdev framework is better than the Javascript ecosystem of frameworks like Vue/React etc is it because they are afraid to learn new things or of change or Blazor/.Net is catching up to Javascript with Web assembly ? Does all the innovations come mostly from the Javascript community as a whole with all the toolings, frameworks, typescript and everything in it compared to C#/Java or stuff like Go/C/C++ will destroy us in term of performance on the backend when Webassembly catchup or they will never catchup ? I'd love to know if you have 2 secs if your using Windows Linux or Macs to program and if your afraid of the telemetry inside VSCode even if your using it in linux ? or you're using VSCodium with Chromium in linux ? or you prefer macs for the adobe suite ?",
					linkUrl: "",
					title: "[AskJS] Will ChatGPT make us obsolete ?",
				},
				{
					userId: 2,
					subId: 3,
					text: "Basketball",
					linkUrl:
						"https://www.cnn.com/2023/01/16/sport/lebron-james-nba-38000-points-spt-intl/index.html",
					title: "LeBron James becomes second player in NBA history to reach 38,000 career points",
				},

				{
					userId: 1,
					subId: 1,
					title: "The first ever post in the Python subreadit",
					text: "I didn'nt like Python at first because I'm afraid of change",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
				},
				{
					userId: 1,
					subId: 1,
					title: "Second",
					text: "I love python",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
				},
				{
					userId: 1,
					subId: 1,
					title: "Third",
					text: "I don't even know what python is",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
				},
				{
					userId: 1,
					subId: 1,
					title: "fourth",
					text: "I'm just here so I don'nt get fined",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
				},
				{
					userId: 1,
					subId: 1,
					title: "fifth",
					text: "Another post",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
				},
				{
					userId: 1,
					subId: 1,
					title: "sixth",
					text: "This is a lot of typing.......",
					linkUrl: "https://www.youtube.com/watch?v=eBGIQ7ZuuiU",
				},
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
					[Op.gte]: 0,
				},
			},
			{}
		);
	},
};
