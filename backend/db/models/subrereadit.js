"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Subrereadit extends Model {
		static associate(models) {
			Subrereadit.belongsTo(models.User, {
				foreignKey: "organizerId",
				as: "Organizer",
				onDelete: "CASCADE"
			});
			Subrereadit.belongsToMany(models.User, {
				through: models.Subscription,
				foreignKey: "subId",
				otherKey: "userId",
				as: "Subscribers",
				onDelete: "CASCADE"
			});
			Subrereadit.hasMany(models.Subscription, {
				foreignKey: "subId",
				onDelete: "CASCADE",
				as: "Subscriptions"
			});
		}
	}
	Subrereadit.init(
		{
			organizerId: {
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
					len: [50, 200]
				}
			}
		},
		{
			sequelize,
			modelName: "Subrereadit",
			scopes: {
				singleSub() {
					const { Subscription, User } = require("../models");
					return {
						attributes: {
							include: [
								[
									sequelize.fn("COUNT", sequelize.col("Subscriptions.id")),
									"SubscriberCount"
								]
							]
						},
						include: [
							{
								model: Subscription,
								attributes: [],
								as: "Subscriptions",
								required: false
							},
							{
								model: User,
								as: "Organizer",
								attributes: ["id", "username"]
							}
						],
						group: ["Subrereadit.id", "Organizer.id"]
					};
				}
			}
		}
	);
	return Subrereadit;
};
