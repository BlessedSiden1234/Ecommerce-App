const jwt = require('jsonwebtoken');

const generateToken = (user) =>{
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin: user.isAdmin
    },process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    return token;
}

module.exports = generateToken