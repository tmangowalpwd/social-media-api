const { Sequelize } = require("sequelize");
const mysqlConfig = require("../configs/database");

const sequelize = new Sequelize({
  username: mysqlConfig.MYSQL_USERNAME,
  password: mysqlConfig.MYSQL_PASSWORD,
  database: mysqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: "mysql",
})

// Models
const Post = require("../models/post")(sequelize);
const User = require("../models/user")(sequelize);

module.exports = {
  sequelize,
  Post,
  User
}