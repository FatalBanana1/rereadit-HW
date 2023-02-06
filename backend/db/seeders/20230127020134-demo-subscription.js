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
					status: "Mod",
				},
				{
					subId: 1,
					userId: 2,
					status: "Member",
				},
				{
					subId: 1,
					userId: 3,
					status: "Member",
				},
				{
					subId: 1,
					userId: 4,
					status: "Member",
				},
				{
					subId: 1,
					userId: 5,
					status: "Member",
				},
				{
					subId: 2,
					userId: 2,
					status: "Member",
				},
				{
					subId: 2,
					userId: 1,
					status: "Mod",
				},
				{
					subId: 2,
					userId: 3,
					status: "Member",
				},
				{
					subId: 2,
					userId: 4,
					status: "Member",
				},
				{
					subId: 3,
					userId: 1,
					status: "Mod",
				},
				{
					subId: 3,
					userId: 2,
					status: "Mod",
				},
				{
					subId: 3,
					userId: 3,
					status: "Member",
				},
				{
					subId: 3,
					userId: 4,
					status: "Member",
				},
				{
					subId: 3,
					userId: 5,
					status: "Member",
				},
				{
					subId: 1,
					userId: 6,
					status: "Member",
				},
				{
					subId: 1,
					userId: 7,
					status: "Member",
				},
				{
					subId: 2,
					userId: 8,
					status: "Member",
				},
				{
					subId: 2,
					userId: 9,
					status: "Banned",
				},
				{
					subId: 3,
					userId: 9,
					status: "Mod",
				},
				{
					subId: 3,
					userId: 8,
					status: "Banned",
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
				id: {
					[Op.gte]: 1,
				},
			},
			{}
		);
	},
};
