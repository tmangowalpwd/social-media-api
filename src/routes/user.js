const router = require("express").Router();
// const DAO = require("../lib/dao");
// const { User, Post } = require("../lib/sequelize");

const User = require("../lib/mongodb/users")

// router.get("/", async (req, res) => {
//   try {
//     const serviceResult = await UserService.getAllUsers(req);

//     if (!serviceResult.success) throw serviceResult;

//     return res.status(serviceResult.statusCode || 200).json({
//       message: serviceResult.message,
//       result: serviceResult.data
//     })
//   } catch (err) {
//     return res.status(err.statusCode || 500).json({
//       message: err.message
//     })
//   }
// })

// router.get("/", async (req, res) => {
//   try {
//     const userDAO = new DAO(User)

//     const findUsers = await userDAO.findAndCountAll(req.query)

//     return res.status(200).json({
//       message: "Find users",
//       result: findUsers
//     })
//   } catch (err) {
//     return res.status(500).json({
//       message: "Server error"
//     })
//   }
// })

router.post("/mongo", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).send("Success")
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Server error"
    })
  }
})

router.get("/mongo", async (req, res) => {
  try {
    const findUsers = await User
      .find({ ...req.query })
      .skip(req.query._limitPerPage * req.query._page)
      .limit(req.query._limit)

    res.status(200).json({
      message: "Success",
      result: findUsers
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Server error"
    })
  }
})

module.exports = router;