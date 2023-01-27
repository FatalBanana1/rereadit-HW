"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Group extends Model {
		static associate(models) {
			// define association here

			Group.belongsTo(models.User, {
				foreignKey: "organizerId",
				as: "Organizer",
			});
		}
	}
	Group.init(
		{
			organizerId: {
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
					len: [50, 200],
				},
			},
			type: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["Online", "In person"],
				defaultValue: "Online",
			},
			private: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 2],
					isAlpha: true,
					isUppercase: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Group",
		}
	);
	return Group;
};
