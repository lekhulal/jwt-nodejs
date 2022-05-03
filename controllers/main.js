const { BadRequestError } = require("../errors")
const jwt = require("jsonwebtoken")

const login = async (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(200).json({ status: true, message: 'User authenticated', token })
}

const dashboard = async (req, res, next) => {
    res.status(200).json({ status: true, message: `Welcome ${req.user.username}` })
}

module.exports = { login, dashboard }