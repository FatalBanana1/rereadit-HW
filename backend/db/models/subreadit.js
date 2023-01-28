"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Subreadit extends Model {
		static associate(models) {
			Subreadit.belongsTo(models.User, {
				foreignKey: "organizerId",
				as: "Organizer",
				onDelete: "CASCADE"
			});
			Subreadit.belongsToMany(models.User, {
				through: models.Subscription,
				foreignKey: "subId",
				otherKey: "userId",
				as: "Subscribers",
				onDelete: "CASCADE"
			});
			Subreadit.hasMany(models.Subscription, {
				foreignKey: "subId",
				onDelete: "CASCADE",
				as: "Subscriptions"
			});
		}
	}
	Subreadit.init(
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
			modelName: "Subreadit",
			scopes: {
				singleSub() {
					const { Subscription, User } = require(".");
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
						group: ["Subreadit.id", "Organizer.id"]
					};
				}
			}
		}
	);
	return Subreadit;
};
