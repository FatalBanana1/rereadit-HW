"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs/dist/bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		toSafeObject() {
			const { id, username, email } = this;
			return { id, username, email };
		}
		validatePassword(password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		}
		static getCurrentUserById(id) {
			return User.scope("currentUser").findByPk(id);
		}

		static async login({ credential, password }) {
			const { Op } = require("sequelize");
			const user = await User.scope("loginUser").findOne({
				where: {
					[Op.or]: {
						username: credential,
						email: credential,
					},
				},
			});
			if (user && user.validatePassword(password)) {
				return await User.scope("currentUser").findByPk(user.id);
			}
		}

		static async signup({
			firstName,
			lastName,
			username,
			email,
			password,
		}) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				firstName,
				lastName,
				username,
				email,
				hashedPassword,
			});
			return await User.scope("currentUser").findByPk(user.id);
		}

		static associate(models) {
			// define association here
			User.hasMany(models.Membership, {
				foreignKey: "userId",
				hooks: true,
			});

			User.hasMany(models.Group, {
				foreignKey: "organizerId",
				as: "Organizer",
				hooks: true,
			});

			User.hasMany(models.Attendance, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 30],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 30],
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "updatedAt", "createdAt"],
				},
			},
			scopes: {
				currentUser: {
					attributes: {
						exclude: ["hashedPassword"],
					},
				},

				loginUser: {
					attributes: {},
				},
			},
		}
	);
	return User;
};
