const { Op } = require("sequelize")
const { User } = require("../lib/sequelize")
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../lib/jwt");
const mailer = require("../lib/mailer");

const authControllers = {
  registerUser: async (req, res) => {
    try {
      // 1. Check apakah username/email sudah digunakan
      // 2. Register user
      const { username, email, full_name, password } = req.body;

      const isUsernameEmailTaken = await User.findOne({
        where: {
          [Op.or]: [
            { username },
            { email }
          ]
        }
      })

      if (isUsernameEmailTaken) {
        return res.status(400).json({
          message: "Username or email has been taken"
        })
      }

      const hashedPassword = bcrypt.hashSync(password, 5)

      const newUser = await User.create({
        username,
        email,
        full_name,
        password: hashedPassword,
      })

      // Verification email
      const verificationToken = generateToken({
        id: newUser.id,
        isEmailVerification: true
      }, "1h")

      const verificationLink =
        `http://localhost:2020/auth/verify/${verificationToken}`

      await mailer({
        to: email,
        subject: "Verify your account!",
        html:
          `Your account has been registered, 
        please verify it by clicking this <a href="${verificationLink}">link</a>`
      })

      return res.status(201).json({
        message: "Registered user"
      })

    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error"
      })
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const findUser = await User.findOne({
        where: {
          username
        }
      });

      if (!findUser) {
        return res.status(400).json({
          message: "Wrong username or password"
        })
      }

      const isPasswordCorrect = bcrypt.compareSync(password, findUser.password)

      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Wrong username or password"
        })
      }

      delete findUser.dataValues.password

      const token = generateToken(
        {
          id: findUser.id,
          role: findUser.role
        }
      )

      // await mailer({
      //   to: findUser.email,
      //   subject: "Logged in account",
      //   text: "An account using your email has logged in"
      // })

      return res.status(200).json({
        message: "Logged in user",
        result: {
          user: findUser,
          token
        }
      })

    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error"
      })
    }
  },
  keepLogin: async (req, res) => {
    // Terima token
    // Check kalau token valid
    // Renew token
    // Kirim token + user data
    try {
      const { token } = req;

      const renewedToken = generateToken({ id: token.id })

      const findUser = await User.findByPk(token.id)

      delete findUser.dataValues.password

      return res.status(200).json({
        message: "Renewed user token",
        result: {
          user: findUser,
          token: renewedToken
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error"
      })
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { token } = req.params

      const isTokenVerified = verifyToken(token)

      if (!isTokenVerified || !isTokenVerified.isEmailVerification) {
        return res.status(400).json({
          message: "Token invalid!"
        })
      }

      await User.update({ is_verified: true }, {
        where: {
          id: isTokenVerified.id
        }
      })

      return res.status(200).json({
        message: "User verified!"
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error"
      })
    }
  }
}

module.exports = authControllers