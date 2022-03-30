const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT

const { sequelize } = require("./lib/sequelize")
sequelize.sync({ alter: true })

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Pict perfect API</h1>")
})

const { postRoutes } = require("./routes")

app.use("/posts", postRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})