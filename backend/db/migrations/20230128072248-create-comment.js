"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			postId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Posts",
				},
				onDelete: "CASCADE",
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
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
			parentId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Comments",
				},
				onDelete: "CASCADE",
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
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Comments");
	},
};
