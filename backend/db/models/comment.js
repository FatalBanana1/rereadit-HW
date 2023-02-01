"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			// Self-referential parent/child associations
			// Parent
			Comment.hasMany(models.Comment, {
				foreignKey: "parentId",
				as: "parentComment",
			});
			// Children
			Comment.belongsTo(models.Comment, {
				foreignKey: "parentId",
				as: "childComments",
			});
			// Post -|---< Comment association
			Comment.belongsTo(models.Post, {
				foreignKey: "postId",
				onDelete: "CASCADE",
				as: "PostComments",
			});
			// User -|---< Comment association
			Comment.belongsTo(models.User, {
				foreignKey: "userId",
			});
		}
	}
	Comment.init(
		{
			postId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Posts",
				},
				onDelete: "CASCADE",
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users",
				},
			},
			parentId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Comments",
				},
				allowNull: true,
			},
			text: {
				type: DataTypes.TEXT,
			},
		},
		{
			sequelize,
			modelName: "Comment",
			scopes: {
				allComments() {
					const { User, Post } = require(".");
					return {
						attributes: {
							exclude: ["updatedAt", "userId"],
						},
						include: [
							{
								model: User,
								attributes: ["id", "username"],
							},
							{
								model: Post,
								as: "PostComments",
								attributes: ["id", "subId", "userId"],
							},
							{
								model: Comment,
								as: "childComments",
							},
						],
						order: [["id"]],
					};
				},
			},
		}
	);
	return Comment;
};
