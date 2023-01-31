"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			// User -|--< Posts association
			Post.belongsTo(models.User, {
				foreignKey: "userId",
				onDelete: "CASCADE"
			});
			// Post -|---< Comments association
			Post.hasMany(models.Comment, {
				foreignKey: "postId",
				onDelete: "CASCADE",
				as: "PostComments"
			});
			// Subreadit -|--< Post association
			Post.belongsTo(models.Subreadit, {
				foreignKey: "subId",
				onDelete: "CASCADE"
			});
		}
	}
	Post.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users"
				},
				onDelete: "CASCADE"
			},
			subId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Subreadits"
				},
				onDelete: "CASCADE"
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					max: 50,
					min: 5
				}
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			picUrl: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			linkUrl: {
				type: DataTypes.TEXT,
				allowNull: true
			}
		},
		{
			sequelize,
			modelName: "Post",
			scopes: {
				allPosts() {
					const { Subreadit, User, Comment } = require(".");
					return {
						attributes: {
							include: [
								[
									sequelize.fn("COUNT", sequelize.col("PostComments.id")),
									"CommentCount"
								]
							],
							exclude: ["createdAt", "updatedAt", "userId", "subId"]
						},
						include: [
							{
								model: User,
								attributes: ["id", "username"]
							},
							{
								model: Subreadit,
								attributes: ["id", "name"]
							},
							{
								model: Comment,
								attributes: [],
								as: "PostComments"
							}
						],
						order: [["id", "DESC"]],
						group: ["Post.id"]
					};
				},
				singlePost() {
					return {};
				}
			}
		}
	);
	return Post;
};
