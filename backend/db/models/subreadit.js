"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Subreadit extends Model {
		static associate(models) {

			Subreadit.belongsTo(models.User, {
				foreignKey: "adminId",
				as: "Admin",
				onDelete: "CASCADE",
			});

			Subreadit.belongsToMany(models.User, {
				through: models.Subscription,
				foreignKey: "subId",
				otherKey: "userId",
				as: "Subscribers",
				onDelete: "CASCADE",
			});

			Subreadit.hasMany(models.Subscription, {
				foreignKey: "subId",
				onDelete: "CASCADE",
				as: "Subscriptions",
			});

			Subreadit.hasMany(models.Post, {
				foreignKey: "subId",
				onDelete: "CASCADE",
			});
		}
	}
	Subreadit.init(
		{
			adminId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users",
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 60],
				},
			},
			about: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					min: 50,
				},
			},
			category: {
				type: DataTypes.ENUM,
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
				type: DataTypes.TEXT,
				allowNull: true,
			},
			circleImage: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Subreadit",
			scopes: {
				singleSub() {
					const { Subscription, User } = require(".");
					return {
						attributes: {
							include: [
								[
									sequelize.fn(
										"COUNT",
										sequelize.col("Subscriptions.id")
									),
									"SubscriberCount",
								],
							],
						},
						include: [
							{
								model: Subscription,
								attributes: [],
								as: "Subscriptions",
								required: false,
							},
							{
								model: User,
								as: "Admin",
								attributes: ["id", "username"],
							},
						],
						group: ["Subreadit.id", "Admin.id"],
					};
				},
			},
		}
	);
	return Subreadit;
};
