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
				onDelete: "CASCADE"
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
				singlePost() {
					return {};
				}
			}
		}
	);
	return Post;
};
