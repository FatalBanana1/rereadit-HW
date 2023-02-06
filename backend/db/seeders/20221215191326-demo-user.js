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
					picUrl: "https://www.giantfreakinrobot.com/wp-content/uploads/2020/11/pirates-of-the-caribbean-jack-sparrow.jpg",
				},

				{
					email: "solo@aol.com",
					username: "solo",
					hashedPassword: bcrypt.hashSync("password2"),
					firstName: "Han",
					lastName: "Solo",
					picUrl: "https://assets2.ignimgs.com/2014/04/29/han-solo-1280bjpg-9aabc6_160w.jpg?width=1280",
				},

				{
					email: "bond@secret.com",
					username: "bond007",
					hashedPassword: bcrypt.hashSync("password3"),
					firstName: "James",
					lastName: "Bond",
					picUrl: "https://deadline.com/wp-content/uploads/2022/12/daniel-craig-no-time-to-die.jpg?w=1000",
				},

				{
					email: "potter@gmail.com",
					username: "wizkid",
					hashedPassword: bcrypt.hashSync("password4"),
					firstName: "Harry",
					lastName: "Potter",
					picUrl: "https://api.time.com/wp-content/uploads/2014/07/301386_full1.jpg",
				},

				{
					email: "globalwarming@aol.com",
					username: "goremania",
					firstName: "Al",
					lastName: "Gore",
					hashedPassword: bcrypt.hashSync("password6"),
					picUrl: "https://media.npr.org/assets/img/2013/04/19/94471365_wide-9e2d8ca055a72b4da0df1cf86e4e6b4dd04650b7-s1100-c50.jpg",
				},
				{
					email: "twelve@gmail.com",
					username: "thirteen",
					firstName: "Eleven",
					lastName: "",
					hashedPassword: bcrypt.hashSync("password7"),
					picUrl: "https://media.glamour.com/photos/5ce474c3d0eb90571454ee79/6:7/w_2769,h_3231,c_limit/stranger-things-3.jpg",
				},
				{
					email: "cosmos@yahoo.com",
					username: "cosmitology",
					firstName: "Cosmo",
					lastName: "Kramer",
					hashedPassword: bcrypt.hashSync("password8"),
					picUrl: "https://www.looper.com/img/gallery/where-is-seinfelds-real-life-cosmo-kramer-today/l-intro-1671045259.jpg",
				},
				{
					email: "thedoor@gmail.com",
					username: "holdit",
					firstName: "Jon",
					lastName: "Snow",
					hashedPassword: bcrypt.hashSync("password9"),
					picUrl: "https://www.rollingstone.co.uk/wp-content/uploads/sites/2/2022/06/JonSnow-1-1024x650.jpg",
				},
				{
					email: "donuts@aol.com",
					username: "gonuts",
					firstName: "Homer",
					lastName: "Simpson",
					hashedPassword: bcrypt.hashSync("password10"),
					picUrl: "https://static.onecms.io/wp-content/uploads/sites/6/2018/08/simp_homersingle08_f_hires2-2000.jpg",
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
					[Op.gte]: 1,
				},
			},
			{}
		);
	},
};
