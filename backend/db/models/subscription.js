"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Subscription extends Model {
		static associate(models) {
			Subscription.belongsTo(models.Subreadit, {
				foreignKey: "subId",
				onDelete: "CASCADE",
			});
			Subscription.belongsTo(models.User, {
				foreignKey: "userId",
				onDelete: "CASCADE",
			});
		}
	}
	Subscription.init(
		{
			subId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Subreadits",
				},
				onDelete: "CASCADE",
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Users",
				},
				onDelete: "CASCADE",
			},
			status: {
				type: DataTypes.ENUM,
				values: ["Mod", "Member", "Banned"],
				defaultValue: "Member",
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Subscription",
		}
	);
	return Subscription;
};
