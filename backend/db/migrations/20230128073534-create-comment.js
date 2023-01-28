"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable("Comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			postId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Posts"
				},
				onDelete: "CASCADE"
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users"
				}
			},
			parentId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Comments"
				},
				allowNull: true
			},
			text: {
				type: Sequelize.TEXT,
				allowNull: false
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
		});
	},
	down: async (queryInterface, Sequelize) => {
		options.tableName = "Comments";
		return queryInterface.dropTable(options);
	}
};
