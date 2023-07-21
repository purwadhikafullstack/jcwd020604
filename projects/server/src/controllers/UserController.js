const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const { where } = require("sequelize");

const userController = {
  getAll: async (req, res) => {
		try {
			const user = await db.users.findAll();
			return res.send(user);
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},

  getUsersById: async(req, res) => {
    try {
        const response = await db.users.findOne({
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  },

  createUser: async (req, res) => {
		try {
      const {fullname, email, password, role} = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
		  await db.users.create({ 
        fullname, 
        email, 
        password: hashPassword, 
        verified: 1, 
        role
      });
      res.status(201).json({msg:"User has been created"});
		} catch (err) {
			console.log(err.message);
			res.status(500).send({
				message: err.message,
			});
		}
	},

  editUser: async (req, res) => {
    try {
      const { fullname } = req.body;
      await db.users.update(
        {
         fullname
        },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );
      res.status(200).json({msg:"User has been updated"});
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },

  deleteUser: async(req, res) => {
    try {
        await db.users.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"User has been deleted"});
    } catch (error) {
        console.log(error.message);
    }
  },

  register: async (req, res) => {
    try {
      const { email } = req.body;

      const findEmail = await db.users.findOne({ where: { email } });
      if (findEmail) {
        throw new Error("Username or email not found");
      } else {
        const createAccount = await db.users.create({
          email,
        });
        const generateToken = nanoid();
        const token = await db.tokens.create({
         expired: moment().add(1, "days").format(),
         token: generateToken,
         userId: JSON.stringify({ id: createAccount.dataValues.id }),
         status: "VERIFY",
       });
        const template = await fs.readFile(
          "./src/template/register.html",
          "utf-8"
        );
        let compiledTemplate = handlebars.compile(template);
        let registerTemplate = compiledTemplate({
          registrationLink: `${process.env.URL_REGISTER}/verify`,
          email,
          token: token.dataValues.token,
        });
        mailer({
          subject: "email verification link",
          to: email,
          text: registerTemplate,
        });

        return res.send({
          message: "register berhasil",
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  verify: async (req, res) => {
    try {
      const { email, password, fullname } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      await db.users.update(
        { password: hashPassword, fullname, verified: 1, role: "USER" },
        { where: { email } }
      );

      return res.send({
        message: "email registered",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("Username or email not found");
      }

      if (!user.dataValues.verified) {
        throw new Error("email not verified");
      }

      const match = await bcrypt.compare(password, user.dataValues.password);
      
      if (!match) {
        throw new Error("Wrong password");
      }

      const userId = { id: user.dataValues.id };
      console.log(userId);
      console.log(user);
      
      let token = await db.tokens.findOne({
        where: {
          userId: JSON.stringify(userId),
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
          status: "LOGIN",
        },
      });

      const generateToken = nanoid();
      if (!token) {
        token = await db.tokens.create({
          expired: moment().add(1, "d").format(),
          token: generateToken,
          userId: JSON.stringify(userId),
          status: "LOGIN",
        });
      }else{
        
        const token = await db.tokens.update({
        expired: moment().add(1, "days").format(),
        token: generateToken,
       }, {
        where: {
          userId: JSON.stringify(userId),
          status: "LOGIN",
        }
       });
      }
      console.log(token);
      return res.status(200).send({
        message: "Success login",
        token: generateToken,
        data: user.dataValues,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getByTokenV2: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      console.log(token);
      let p = await db.tokens.findOne({
        where: {
          [db.Sequelize.Op.and]: [
            {token},
            {
              expired: {
                [db.Sequelize.Op.gt]: moment("00:00:00", "hh:mm:ss").format(),
                [db.Sequelize.Op.lte]: moment().add(1, "d").format(),
              },
            },
            {
              valid: true,
            },
          ], 
        },
      });
      console.log(p?.dataValues);
      if (!p) {
        throw new Error("token has expired");
      }
      user = await db.users.findOne({
        where: {
          id: JSON.parse(p?.dataValues?.userId).id,
        },
      });
      delete user.dataValues.password;
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },

  getUserByToken: async (req, res) => {
    res.send(req.user);
  },
};
module.exports = userController;
