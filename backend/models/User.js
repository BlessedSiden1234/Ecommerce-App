const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, "Please provide your name"],
        minlength: 3,
        maxlength: 50
    },

    email: {
        type: String,
        required :[true, 'please provide a email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required :true,
        minlength: 6,
    },

    isAdmin: {
        type: Boolean,
        default: false,
        required :true
    },
    
    
}, {
    timestamps: true,
})

//UserSchema.pre('save', async function(){
    //const salt = await bcrypt.genSalt(10)
    //this.password = await bcrypt.hash(this.passsword, salt)
//})

UserSchema.methods.createJWT = function(){
    return jwt.sign(
    {
        userId: this._id,
        name: this.name
    },
     process.env.JWT_SECRET, 
    {
        expiresIn: '30d'
    })
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password )
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema)