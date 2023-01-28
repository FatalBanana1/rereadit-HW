"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Subreadits",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				adminId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Users",
						as: "Admin",
					},
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				about: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				category: {
					type: Sequelize.ENUM,
					values: [
						"Arts",
						"Business",
						"Community",
						"Dancing",
						"Education",
						"Games",
						"Health",
						"Hobbies",
						"Politics",
						"Music",
						"Family",
						"Pets",
						"Religion",
						"Science",
						"Social",
						"Sports",
						"Support",
						"Technology",
						"Travel",
						"Writing",
					],
					defaultValue: "Hobbies",
					allowNull: false,
				},
				bannerImage: {
					type: Sequelize.TEXT,
					allowNull: true,
				},
				circleImage: {
					type: Sequelize.TEXT,
					allowNull: true,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Subreadits";
		await queryInterface.dropTable(options);
	},
};
