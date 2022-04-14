const mongoose = require("mongoose")

const connectMongoDB = () => {
  return mongoose.connect("mongodb://localhost:27017/jcwd-social-media")
}

module.exports = {
  connectMongoDB
}