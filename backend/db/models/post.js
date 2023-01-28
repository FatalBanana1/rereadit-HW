"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here

			Post.belongsTo(models.Subreadit, {
				foreignKey: "subId",
				onDelete: "CASCADE",
			});

			Post.belongsTo(models.User, {
				foreignKey: "userId",
				onDelete: "CASCADE",
			});

			Post.hasMany(models.Comment, {
				foreignKey: "postId",
				onDelete: "CASCADE",
			});
		}
	}
	Post.init(
		{
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users",
				},
				onDelete: "CASCADE",
				allowNull: false,
			},
			subId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Subreadits",
				},
				onDelete: "CASCADE",
				allowNull: false,
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			linkUrl: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
