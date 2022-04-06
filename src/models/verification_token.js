const { DataTypes } = require("sequelize");

const VerificationToken = (sequelize) => {
  return sequelize.define(
    "VerificationToken",
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      validUntil: {
        type: DataTypes.DATE,
        allowNull: false
      },
    }
  )
}

module.exports = VerificationToken;