const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../errors")

const auth = async (req, res, next) => {

    const requestAuthHeader = req.headers.authorization

    if (!requestAuthHeader || !requestAuthHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError("Token not provided!")
    }

    const token = requestAuthHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new UnauthorizedError('Not authorized to access this route')
    }
}

module.exports = auth