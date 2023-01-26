"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

//todo: add previewimage prop
// join 1-many: group-groupimages
// join many-many: groups-users in memberships
// join 1-many: groups-venues
// join 1-many: groups-events

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Groups";
		return queryInterface.bulkInsert(
			options,
			[
				{
					organizerId: "1",
					name: "Skydiving Enthusiasts",
					about: "Experience the thrill of skydiving without any of the danger.",
					type: "In person",
					private: true,
					city: "Philadelphia",
					state: "PA",
				},
				{
					organizerId: "3",
					name: "Broadway Watchers",
					about: "Watching a Broadway show is an experience like no other, fun guaranteed.",
					type: "In person",
					private: true,
					city: "NYC",
					state: "NY",
				},
				{
					organizerId: "3",
					name: "Museum Explorers",
					about: "Come face to face with dinosaurs at the American Natural History Museum.",
					type: "In person",
					private: false,
					city: "NYC",
					state: "NY",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Groups";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.in]: [1, 2, 3],
				},
			},
			{}
		);
	},
};
