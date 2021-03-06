const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT

const { sequelize } = require("./lib/sequelize")
sequelize.sync({ alter: true })

// const { connectMongoDB } = require("./lib/mongodb")
// connectMongoDB().then(() => {
//   console.log("Mongo DB Connected")
// })

const app = express();

app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
  console.log("request masuk")
  next();
})

app.get("/", (req, res) => {
  res.send("<h1>Pict perfect API</h1>")
})

const { postRoutes, authRoutes, userRoutes, productRoutes } = require("./routes")

app.use("/post_images", express.static(`${__dirname}/public/posts`))
app.use("/profile_pictures", express.static(`${__dirname}/public/profile_pictures`))

app.use("/posts", postRoutes)
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/products", productRoutes)

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})