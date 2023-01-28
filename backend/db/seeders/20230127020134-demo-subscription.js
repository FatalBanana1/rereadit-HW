"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Subscriptions";
		return queryInterface.bulkInsert(
			options,
			[
				{
					subId: 1,
					userId: 1,
					mod: true,
				},
				{
					subId: 1,
					userId: 2,
					mod: false,
				},
				{
					subId: 1,
					userId: 3,
					mod: false,
				},
				{
					subId: 1,
					userId: 4,
					mod: false,
				},
				{
					subId: 1,
					userId: 5,
					mod: false,
				},
				{
					subId: 2,
					userId: 2,
					mod: true,
				},
				{
					subId: 2,
					userId: 1,
					mod: false,
				},
				{
					subId: 2,
					userId: 3,
					mod: false,
				},
				{
					subId: 2,
					userId: 4,
					mod: false,
				},
				{
					subId: 2,
					userId: 5,
					mod: false,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Subscriptions";
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
