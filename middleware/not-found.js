const notFound = async (req, res) => res.status(404).send(`Requested route not exist :(`)

module.exports = notFound