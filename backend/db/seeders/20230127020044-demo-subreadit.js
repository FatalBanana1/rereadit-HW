"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Subreadits";
		return queryInterface.bulkInsert(
			options,
			[
				{
					adminId: 1,
					name: "Python",
					about:
						"News about the programming language Python. If you have something to teach others post here.",
					category: "Technology",
					circleImage:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/800px-Python.svg.png",
					bannerImage: "https://i.redd.it/v7g6ime1wtk61.jpg"
				},
				{
					adminId: 1,
					name: "JavaScript",
					about: "All about the JavaScript programming language!",
					category: "Technology",
					circleImage:
						"https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
					bannerImage:
						"https://ucarecdn.com/01292099-b782-4b74-a05e-f902be3feecd/"
				},
				{
					adminId: 1,
					name: "Reddit Sports",
					about:
						"Sports News and Highlights from the NFL, NBA, NHL, MLB, MLS, and leagues around the world.",
					category: "Sports",
					circleImage: "https://wallpaperaccess.com/full/552032.jpg",
					bannerImage:
						"https://www.ymcapalmbeaches.org/sites/ymcapalmbeaches/files/sports-balls-equipment.jpeg"
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Subreadits";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				adminId: {
					[Op.gte]: 0
				}
			},
			{}
		);
	}
};
