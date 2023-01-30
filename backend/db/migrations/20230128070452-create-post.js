"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			"Posts",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				userId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Users"
					},
					onDelete: "CASCADE",
					allowNull: false
				},
				subId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Subreadits"
					},
					onDelete: "CASCADE",
					allowNull: false
				},
				title: {
					type: Sequelize.STRING(50),
					allowNull: false
				},
				text: {
					type: Sequelize.TEXT,
					allowNull: false
				},
				picUrl: {
					type: Sequelize.TEXT,
					allowNull: true
				},
				linkUrl: {
					type: Sequelize.TEXT,
					allowNull: true
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
				}
			},
			options
		);
	},
	down: async (queryInterface, Sequelize) => {
		options.tableName = "Posts";
		return queryInterface.dropTable(options);
	}
};
