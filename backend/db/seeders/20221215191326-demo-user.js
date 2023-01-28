"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Users";
		return queryInterface.bulkInsert(
			options,
			[
				{
					email: "sparrow@user.io",
					username: "captain",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Jack",
					lastName: "Sparrow",
				},

				{
					email: "solo@aol.com",
					username: "solo",
					hashedPassword: bcrypt.hashSync("password2"),
					firstName: "Han",
					lastName: "Solo",
				},

				{
					email: "bond@secret.com",
					username: "bond007",
					hashedPassword: bcrypt.hashSync("password3"),
					firstName: "James",
					lastName: "Bond",
				},

				{
					email: "potter@gmail.com",
					username: "wizkid",
					hashedPassword: bcrypt.hashSync("password4"),
					firstName: "Harry",
					lastName: "Potter",
				},

				{
					email: "globalwarming@aol.com",
					username: "goremania",
					firstName: "Al",
					lastName: "Gore",
					hashedPassword: bcrypt.hashSync("password6"),
				},
				{
					email: "twelve@gmail.com",
					username: "thirteen",
					firstName: "Eleven",
					lastName: "",
					hashedPassword: bcrypt.hashSync("password7"),
				},
				{
					email: "cosmos@yahoo.com",
					username: "cosmitology",
					firstName: "Cosmo",
					lastName: "Kramer",
					hashedPassword: bcrypt.hashSync("password8"),
				},
				{
					email: "thedoor@gmail.com",
					username: "holdit",
					firstName: "Jon",
					lastName: "Snow",
					hashedPassword: bcrypt.hashSync("password9"),
				},
				{
					email: "donuts@aol.com",
					username: "gonuts",
					firstName: "Homer",
					lastName: "Simpson",
					hashedPassword: bcrypt.hashSync("password10"),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.gte]: 0,
				},
			},
			{}
		);
	},
};
