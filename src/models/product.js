const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
  return sequelize.define(
    "Product",
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      image_url: {
        type: DataTypes.STRING,
      }
    }
  )
}

module.exports = Product;