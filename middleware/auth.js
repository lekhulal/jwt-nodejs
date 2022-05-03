const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../errors")

const auth = async (req, res, next) => {

    const requestAuthHeader = req.headers.authorization

    if (!requestAuthHeader || !requestAuthHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError("Token not provided!")
    }

    const token = requestAuthHeader.split(' ')[1]

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
    }
    next()
}

module.exports = auth