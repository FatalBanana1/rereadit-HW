"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Subscriptions",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				subId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Subreadits",
					},
					onDelete: "CASCADE",
					allowNull: false,
				},
				userId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Users",
					},
					onDelete: "CASCADE",
					allowNull: false,
				},
				status: {
					type: Sequelize.ENUM,
					values: ["Owner","Mod", "Member", "Banned"],
					defaultValue: "Member",
					allowNull: false,
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
		options.tableName = "Subscriptions";
		await queryInterface.dropTable(options);
	},
};
