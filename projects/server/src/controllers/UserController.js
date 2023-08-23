const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const { where } = require("sequelize");
const Joi = require("joi");

const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.users.findAll({
				attributes: ["uuid", "fullname", "email","phone_number", "role"],
			});
			return res.send(user);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	getUsersById: async (req, res) => {
		try {
			const response = await db.users.findOne({
				attributes: ["uuid", "fullname", "email", "phone_number", "avatar_url", "warehouse_id", "role"],
				include: [{ model: db.addresses }],
				where: {
					uuid: req.params.uuid,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	getUsersByRole: async (req, res) => {
		try {
			const { role } = req.params;
			const response = await db.users.findAll({
				attributes: ["uuid", "fullname", "email", "phone_number", "warehouse_id", "role"],
				where: {
					role: role,
				},
				include: [{ model: db.warehouses }],
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	},

	createUser: async (req, res) => {
		const userSchema = Joi.object({
			fullname: Joi.string().required(),
			email: Joi.string().email().required(),
			phone_number: Joi.number().min(12).required(),
			password: Joi.string().min(6).required(),
			verified: Joi.boolean().required(),
			role: Joi.string().valid("W_ADMIN", "USER").required(),
		});
		const { error, value } = userSchema.validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}
		try {
			const { fullname, email, phone_number, password, role } = value;
			const hashPassword = await bcrypt.hash(password, 10);

			await db.users.create({
				fullname,
				email,
				phone_number,
				password: hashPassword,
				verified: 1,
				role,
			});

			res.status(201).json({ msg: "User has been created" });
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	editUser: async (req, res) => {
		try {
			const { fullname, email, phone_number, password, verified, role } = req.body;

			await db.users.update(
				{
					fullname,
					email,
					phone_number,
					password,
					verified,
					role,
				},
				{
					where: {
						uuid: req.params.uuid,
					},
				}
			);
			res.status(200).json({ msg: "User has been updated" });
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	editUserV2: async (req, res) => {
		try {
			const { fullname, phone_number } = req.body;
			await db.users.update(
				{
					fullname,
					phone_number
				},
				{
					where: {
						uuid: req.params.uuid,
					},
				}
			);
			res.status(200).json({ msg: "User has been updated" });
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	deleteUser: async (req, res) => {
		try {
			await db.users.destroy({
				where: {
					uuid: req.params.uuid,
				},
			});
			res.status(200).json({ msg: "User has been deleted" });
		} catch (error) {
			res.status(500).send({
				message: err.message,
			});
		}
	},

	insertImage: async (req, res) => {
		const t = await db.sequelize.transaction();
		try {
			const { filename } = req.file;
			await db.users.update(
				{ avatar_url: process.env.user_img + filename },
				{ where: { id: req.params.id }, transaction: t }
			);
			await t.commit();
			res.send({ message: "Upload berhasil" });
		} catch (err) {
			await t.rollback();
			return res.status(500).send({ message: err.message });
		}
	},

	resetPassword: async (req, res) => {
		try {
			const { email } = req.body;
			const findEmail = await db.users.findOne({ where: { email } });

			if (!findEmail) {
				throw new Error("Username or email not found");
			} else {
				const generateToken = nanoid();
				const token = await db.tokens.create({
					expired: moment().add(1, "days").format(),
					token: generateToken,
					userId: JSON.stringify({ id: findEmail.dataValues.id }),
					status: "FORGOT-PASSWORD",
				});

				const template = await fs.readFile(
					"./src/template/resetPassword.html",
					"utf-8"
				);

				let compiledTemplate = handlebars.compile(template);
				let resetPasswordTemplate = compiledTemplate({
					registrationLink: `${process.env.URL_RESET_PASSWORD}/reset-password/${token.dataValues.token}`,
				});

				mailer({
					subject: "Reset Password - Email Verification Link",
					to: email,
					text: resetPasswordTemplate,
				});

				return res.send({
					message: "Reset password berhasil",
				});
			}
		} catch (err) {
			return res.status(500).send(err.message);
		}
	},

	verifyV2: async (req, res) => {
		try {
			const { id } = req.user;
			const { token } = req.query;
			const { password } = req.body;
			const hashPassword = await bcrypt.hash(password, 10);

			await db.users.update(
				{ password: hashPassword, verified: 1 },
				{ where: { id } }
			);
			await db.tokens.update(
				{
					valid: false,
				},
				{
					where: {
						token,
					},
				}
			);
			return res.send({
				message: "password registered",
			});
		} catch (err) {
			return res.status(500).send(err.message);
		}
	},
};
module.exports = userController;
