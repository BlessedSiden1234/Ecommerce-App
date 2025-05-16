const mongoose = require('mongoose');

const connectDB = (url) =>{
    console.log('Successfully Connected to Database')
    return mongoose.connect(url)
}

module.exports = connectDB