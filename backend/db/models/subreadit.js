"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Subreadit extends Model {
		static associate(models) {
			// User -|--< Subreadits Amin Association
			Subreadit.belongsTo(models.User, {
				foreignKey: "adminId",
				as: "Admin",
				onDelete: "CASCADE"
			});
			// Subreadits -|--< Subscriptions >--|- Users Associations
			// Subscribers
			Subreadit.belongsToMany(models.User, {
				through: models.Subscription,
				foreignKey: "subId",
				otherKey: "userId",
				as: "Subscribers",
				onDelete: "CASCADE"
			});
			// Mods
			Subreadit.belongsToMany(models.User, {
				through: models.Subscription,
				foreignKey: "subId",
				otherKey: "userId",
				as: "Mods",
				onDelete: "CASCADE"
			});
			// Subreadit -|--< Subscriptions Association
			Subreadit.hasMany(models.Subscription, {
				foreignKey: "subId",
				onDelete: "CASCADE",
				as: "Subscriptions"
			});
			// Subreadit -|--< Posts association
			Subreadit.hasMany(models.Post, {
				foreignKey: "subId",
				onDelete: "CASCADE"
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
					model: "Users"
				}
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 60]
				}
			},
			about: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					min: 50
				}
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
					"Writing"
				],
				defaultValue: "Hobbies",
				allowNull: false
			},
			bannerImage: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			circleImage: {
				type: DataTypes.TEXT,
				allowNull: true
			}
		},
		{
			sequelize,
			modelName: "Subreadit",
			scopes: {
				allSubreadits() {
					const { Subscription, User } = require(".");
					return {
						attributes: {
							include: [
								[
									sequelize.fn("COUNT", sequelize.col("Subscriptions.id")),
									"SubscriberCount"
								]
							],
							exclude: ["createdAt", "updatedAt"]
						},
						include: [
							{
								model: User,
								as: "Admin",
								attributes: ["id", "username"]
							},
							{
								model: Subscription,
								attributes: [],
								as: "Subscriptions"
							}
						],
						order: [["id", "DESC"]],
						group: ["Admin.id", "Subreadit.id"]
					};
				},
				singleSubreadit() {
					const { Subscription, User, Post } = require(".");
					return {
						attributes: {
							include: [
								[
									sequelize.fn("COUNT", sequelize.col("Subscriptions.id")),
									"SubscriberCount"
								]
							],
							exclude: ["createdAt", "updatedAt"]
						},
						include: [
							{
								model: User,
								as: "Admin",
								attributes: ["id", "email", "username"]
							},
							{
								model: User,
								through: {
									model: Subscription,
									attributes: [],
									where: {
										status: "Mod"
									}
								},
								attributes: ["id", "email", "username"],
								as: "Mods"
							},
							{
								model: Subscription,
								attributes: [],
								as: "Subscriptions"
							},
							{
								model: User,
								through: {
									model: Subscription,
									attributes: []
								},
								attributes: ["id", "email", "username"],
								as: "Subscribers"
							}
						],
						group: ["Admin.id", "Subreadit.id", "Subscribers.id", "Mods.id"]
					};
				}
			}
		}
	);
	return Subreadit;
};
