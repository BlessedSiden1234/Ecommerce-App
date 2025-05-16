const {StatusCodes } = require('http-status-codes')

const asyncWrapper = (err, res, req, next) => res.status(StatusCodes.NOT_FOUND).send({message: err.message})

module.exports = asyncWrapper;