const { DataTypes } = require("sequelize");

const Post = (sequelize) => {
  return sequelize.define(
    "Post",
    {
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      caption: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      }
    }
  )
}

module.exports = Post;