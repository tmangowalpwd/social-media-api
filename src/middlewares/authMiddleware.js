const { verifyToken } = require("../lib/jwt")

const authorizedLoggedInUser = (req, res, next) => {
  try {
    const token = req.headers.authorization

    const verifiedToken = verifyToken(token)
    req.token = verifiedToken

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: err.message
    })
  }
}

module.exports = { authorizedLoggedInUser }