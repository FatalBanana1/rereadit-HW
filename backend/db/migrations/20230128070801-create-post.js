"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Posts",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				title: {
					type: Sequelize.STRING(100),
					allowNull: false
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
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Posts");
	}
};
