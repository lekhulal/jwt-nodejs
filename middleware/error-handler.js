const { StatusCodes } = require("http-status-codes")
const errorHandler = async (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later!',
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = 400
    }

    return res.status(customError.statusCode).json({ errorMessage: customError.msg })
}

module.exports = errorHandler

