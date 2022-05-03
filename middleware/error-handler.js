const { StatusCodes } = require("http-status-codes")
const { CustomError } = require("../errors")
const errorHandler = async (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ errorMessage: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Something went wrong, please try again later!`)
}

module.exports = errorHandler