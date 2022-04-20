const { Product } = require("../lib/sequelize");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    await Product.create({
      ...req.body,
    })

    return res.status(201).send("Success");
  } catch (err) {
    return res.status(500).send("Error")
  }
})

router.get("/", async (req, res) => {
  try {
    const findProducts = await Product.findAll();

    return res.status(200).json({
      message: "Success",
      result: findProducts
    })
  } catch (err) {
    return res.status(500).send("Error")
  }
})


module.exports = router