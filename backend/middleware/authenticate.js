const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleWare = async(req, res, next) =>{
    const authHeader = req.headers.authorization
    if(authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
            if(err){
                res.status(401).send({message: 'Invalid Token'})
            }else{
                req.user = decode;
                next()
            }
        })
    }else{
        res.status(401).send({message: 'No Token'})
    }
}

module.exports = authenticationMiddleWare