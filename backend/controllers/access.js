const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const data = require('../data')
const {StatusCodes} = require('http-status-codes');
const generateToken = require('../Util')
const expressAsyncHandler = require('express-async-handler')


const signInUser = expressAsyncHandler(async(req, res) =>{
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
        return;
        }
    } 
    res.status(StatusCodes.NOT_FOUND).json({message: 'Invalid Credentials'})
});

const signupUser = expressAsyncHandler(async(req, res) =>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })

    const user = await newUser.save();
    res.status(StatusCodes.OK).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
})

const updateUser = expressAsyncHandler(async(req, res) =>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    }else{
        res.status(404).send({message: 'User not Found'})
    }
})
module.exports = {signInUser, signupUser, updateUser};