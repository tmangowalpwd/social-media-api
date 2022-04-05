class Service {
  static handleServerError = (res, err) => {
    console.log(err)
    res.status(500).json({
      message: "Server error"
    })
  }

  static handleClientError = (res, err = {
    statusCode: 400,
    message: "Client error"
  }) => {
    res.status(err.statusCode || 400).json({
      message: err.message
    })
  }

  static handleSuccess = (res, result) => {
    res.status(result.statusCode || 200).json({
      message: result.message,
      result: result.data
    })
  }
}

module.exports = Service